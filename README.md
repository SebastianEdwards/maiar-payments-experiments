Maiar Payments
==============
A fast, low-fee, multi-asset payments backbone for the new crypto-economy

Motivation
----------
Why a special SC-backed payment system and not simple native EGLD/ESDT transfers?

Primarily, because vendors and businesses want to settle payments in a fixed currency like USD (both for POS integration ease and general practicality and accounting.) The smart contract exists to automatically convert tokens into the requested settlement token. This is key as in conjunction with QR codes used at the point of sale - it allows in-person transactions to be resolved quickly and efficiently (using payment IDs as references to integrate systems), even if the user does not currently have the required settlement token/currency in their balance.

Secondly, it enables “pull” payment functionality for subscriptions and similar applications which is critical for many use-cases (including card functionality).

Lastly, it gives a level of abstraction over the base account so that “payment accounts” can be shared between family members or business associates.

Components
----------
Payment accounts - user-owned smart contracts which hold EGLD and other ESDT assets and can automatically handle asset conversion via Maiar Exchange into a requested settlement token and handle payments using both push (one-off) and pull (subscriptions) methods

Maiar - Elrond digital wallet app which provides the UI component

Maiar Exchange - Elrond AMM swap platform for ESDT tokens

Maiar Forex - stablecoin “forex swap” platform backed by exchange rate oracle data

Phase 0 - Allow user to create payment accounts

Inside Maiar the user should be able to deploy a smart contract-backed “payment account” on the network. A many-to-many relationship should exist for these, I.E. one user should be able to open multiple “payment accounts” to achieve any of the following: create a separate payments account for his/her business, spouse, dependants, etc. or simply to help organise their own spending habits more effectively. It should also be possible to share access to “payment accounts” with other Maiar users (for business partners, family, etc.) via their address or by Maiar herotag.

At the most basic level “deposit” and “withdraw” functions exist on the Smart Contract to add or remove EGLD and ESDT tokens. Payment functions will be described in the various stages below.

Note on locality: for speed and UX purposes “payment accounts” would ideally be co-located in the same shard as the creator account. Though as adaptive state sharding is rolled out this can not be counted on. Additionally as access can be shared across accounts - this also somewhat rules out relying on same-shardedness.

Note on transaction royalties: the user being the owner of the smart contract should be entitled to the 30% royalties on the account. This acts as a small gas fee rebate.

Note on upgradability: if this smart contract needs to be upgraded - the user should be prompted to upgrade the “payment account” via code bundled with new versions of Maiar. This could also just happen transparently in the background using a meta-transaction to deploy a new version when the user opens the app if possible. For purposes that will become obvious in “phase 3” the user should not be able to arbitrarily upgrade this code.

Note on UI: “payment accounts” should be integrated as seamlessly as possible into the Maiar UI and users should not need to be particularly aware that there is a separate smart contract. Similar to how the staking smart contracts do not really need to be fully comprehended.

Phase 1 - One-off user initiated payments (push)
------------------------------------------------

Example flow
Point of sale system generates QR code and displays on PoS terminal, prints on restaurant bill, or displays on screen as part of ecommerce checkout flow, etc. E.g. a URL of this form is QR coded:
maiar:payment?tokenIdentifier=BUSD-ade124&amount=50&paymentId=uniqueref&paymentAddress=erd...

User scans using Maiar app, or using the built-in camera apps which deep-link to Maiar app.

User is presented with list of their existing “payment accounts” (if only one exists - this should be picked by default and this step skipped)

User can see the amount and settlement token type in the interface and approve this payment

A “pay” transaction is sent from user wallet to payment account which passes the details from the QR code. Note: if the “payment account” is lacking sufficient funds but the base Maiar account has enough balance: this transaction could also carry funds from the primary account to the payment account using a payable endpoint (showing this in the UI as a simultaneous top-up deposit and payment)

Payment account automatically swaps tokens in the payment account into the settlement token in the most efficient manner using Maiar Exchange and then sends the payment to the specified address with the paymentId in the data field

Note on stablecoins: when settlement is requested in stablecoin other than BUSD (or similar) it is likely that an AMM-based swap will not have sufficient liquidity depth on pairs to guarantee low slippage and efficient execution. To this end - we suggest a new type of swap “Maiar Forex” which solely uses on-chain oracle data to convert between stablecoin pairs according to most recent exchange rates. The payments contract would abstract across these two exchanges to do the most efficient transaction possible.

Note on integration: to ease integration for POS suppliers/integrators - a trusted observer network could run which watches for payment transactions and surfaces these as authenticated webhook calls.

Note on who pays gas fees: by default the user would pay to “pay” in this scenario. However, this architecture could be extended using meta-transactions to achieve a “service-provider” pays with regard to the gas fees.


Phase 2 - Recurring payments / subscriptions (pull authorizations)
------------------------------------------------------------------

An increasingly important aspect of any payments infrastructure is the ability for vendors and businesses to charge users in a recurring fashion for access to certain services. A “payments account” could facilitate these types of financial transactions.

Example flow
Service provider generates QR code and displays it in the signup process. E.g. a URL of this form is QR coded:
maiar:authorizeSubscription?tokenIdentifier=BUSD-ade124&amount=50&periodEpochs=30&subscriptionId=uniquesubref&paymentAddress=erd…

User scans using Maiar app, or built-in camera app which deep-links to Maiar app.

User is presented with list of their existing “payment accounts” (if only one exists - this should be picked by default and this step skipped)

Users can see the amount, settlement token type, and how often (at most) the service provider will be able to charge this fee (in days/epochs) in the interface and approve this authorization.

An “authorizeSubscription” transaction is sent from the user’s wallet to the payment account which passes the details from the QR code. A subscription object is then stored inside the “payment account” storage.

At any time, the service provider can request a payment amount up to the value amount specified in the subscription by calling “requestSubscriptionPayment” on the “payment account” for a given subscriptionId and passing in a paymentId. The “payment account” will run checks to ensure that no more that the specified amount limit is taken out in any one “subscription period” defined by the epochs. If check passes and balance is sufficient - this will call the pay method internally and settlement of funds into the correct token type will be handled automatically via Maiar Exchange and/or Maiar Forex.

Maiar will give a simple UI to manage the active subscriptions on any “payment account” and cancel these as needed.

Note: a controlling address for the subscription should be stored in the subscription object. This is the only address which should be able to initiate the requestSubscriptionPayment for that subscription.

Phase 3 - Physical / virtual debit cards (pull authorizations with withdrawal locks)
------------------------------------------------------------------------------------

The final phase involves integrating this system with something like “Stripe Issuing” to give Maiar users access to physical or virtual (on device) debit cards which can be accepted at millions of retailers worldwide.

Similar to subscriptions, the user gives authorization to a third-party (the card issuer) to directly debit the balance (up to a given limit). The token type will be dependent on the card. IE users can add a USD card which settles transactions in BUSD or a EUR card which settles in a different stablecoin. Unlike subscriptions - this limit is not imposed in a time-dependent manner, rather it is a limit on the max purchase amount. Additional limits may be imposed on the card issuer’s side (daily limits or ATM withdrawal limits, etc)

Problem: how do you reconcile finality of on-chain transactions (which may include cross-chain asset exchange calls) with the finality times required by traditional card processing without exposing the card issuer (Maiar) to undue counterparty risk?

Solution: a fast on-chain locking mechanism. Before processing the transaction, the card issuer only has to verify that sufficient funds are available in the account, that the smart contract still uses a verifiable code version, that the card authorization is still present on the payment account, and that the amount to be charged is less than the limit on the card authorization.

The issuer then runs a function on it’s own smart contract that puts a lock into storage before kicking off the payment flow. Any time a user tries to “withdraw” from a “payment account” that has an active card authorization - it will first check using an async call with the card issuer to see if there are any locked amounts which still require settlement and accept or deny the withdrawal appropriately. Stopping users from being able to overwrite this “withdrawal” check is why the user must not be able to upgrade their own “payment account” SC.

There is still a very small window of time where users could charge their card and then execute the withdraw function on their “payment account”. This could be mitigated by having any “withdraw” request “bounce” the SC call to a metachain SC and then back (callback) before running the lock check. This would somewhat guarantee that the card issuer’s lock (which requires no cross-shard calls) has sufficient time to process before the withdrawal check is run. Withdrawals happen infrequently so slowing this down artificially should not be a major issue.

Even with this soft guarantee - sensible card limits should be used so that the scope of failure is limited. A small monthly fee could be imposed on all card-holders and used as a kind of insurance fund.

Note on multi-currency cards: It may be possible to have a single card use multiple currencies depending where it is used, etc. The ability to do this however depends on the card issuing platform - I’ve looked primarily only at Stripe Issuing where currency is fixed to the card at creation time. Whether it is a benefit or not depends on whether the Maiar Forex exchange rates could be lower than native forex of the card issuer - for example Stripe Issuing charge 30c + 1% on forex conversions. A multi-currency approach would have a slightly different API than described below.


Proposed payment account SC API spec
------------------------------------

[payable “*”]
deposit()

withdraw(tokenIdentifier, amount)

grantAccess(address)

[payable “*”] // payable to facilitate simultaneous “top-up” and payment as required
pay(paymentAddress, tokenIdentifier, amount, paymentId)

authorizeSubscription(authorizedAddress, tokenIdentifier, limit, periodEpochs, subscriptionId)

cancelSubscription(subscriptionId)

requestSubscriptionPayment(paymentAddress, subscriptionId, amount, paymentId)

authorizeCard(authorizedAddress, tokenIdentifier, limit, cardId)

cancelCard(cardId)

requestCardPayment(paymentAddress, cardId, amount, paymentId)


Possible exploit vector
-----------------------

Depending on how permissive Maiar Exchange is with the creation of new liquidity pools - a possible exploit could exist whereby payment could be requested in a token which looks like a popular token I.E. BUSD but is actually a similarly named but completely different low-liquidity token. This could trick users into doing expensive swaps where the malicious actor controls the LP. This can be mitigated on the UI-side or also by having a default trusted token whitelist and require users to manually extend this with any new tokens via a function if required (with warnings). If Maiar Exchange has more strict controls over LP creation this may not be required.

Integration future potential
----------------------------

Once this backbone is in place; a whole world of integration potential can open up. From cloud-based in-store PoS operators to ecommerce payment method plugins. Shared infrastructure that abstracts the blockchain elements can be built and templates shared with subscription service providers to incorporate into traditional web2 apps, etc.

A large caveat on user privacy
------------------------------

With this sort of architecture; it is somewhat important that the “payee account” is at a large enough level of granularity that a minimum of user information is revealed. For example: I may not want to announce to the world I just made a payment at Joe's Cafe and thus broadcast my immediate geographic location. However, if I am making a payment at Joe’s Cafe, and the integration is done through a popular point-of-sale system - any payment would be effectively tumbled with many other payments to many other businesses as long as the payment does not immediately bounce along to Joe’s account but is instead held for some number of hours in a shared account before being paid out to the actual payee.

This convention could be enforced by only allowing payments to be paid to another predefined smart contract type which forces this temporal delay on transaction resolution and requires the integrator to run a “payout” function regularly by providing a mapping of paymentIds to payee accounts. The integrator could be forced to delay this information by requiring that a certain number of hours have passed since each of the payments in any provided mapping have occurred. A penalty could be imposed by requiring that this contract be “staked” to accept payments and slashing the stake for each infraction (requesting payout for a payment too soon).

While this may sound burdensome, all of this should be abstracted away from the cafe owner and only be an implementation detail for the point-of-sale company or integrator to keep in mind.

This privacy issue is not a concern in the “card issuer” scenario as any mapping between payments and their final destination happens off-chain. Although, as with any payments card - access to this off-chain information should be strictly limited.
