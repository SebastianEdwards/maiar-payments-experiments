Prototype Elrond Payment System
===============================
A fast, low-fee, multi-asset payments backbone for the new crypto-economy

#### Goals
1) Enable businesses to request payment in a preferred settlement token. This will usually, but not necessarily always, be some kind of fiat-pegged stablecoin

2) Make payments frictionless by using on-chain exchange (debit) and lending (credit) services to automatically resolve assets into settlement currency at payment time

3) Provide a simple and intuitive UI for the user to enter a payment flow (via QR codes), give payment authorization, view past transactions, etc. As well as provide basic feedback/analytics of what they are spending on (information stored off-chain on device)

4) Expand universe of possible payments from simple “push” transactions, to include “pull” to support subscriptions and other recurring revenue models

5) Demonstrate how withdrawal locking via trustless contracts could be used to enable even the sub-second response times required by card issuers

6) Improve user privacy vis-a-vis who they are paying and how much by limiting the amount of data on-chain which can deterministically link payer and payee

7) Provide a level of abstraction so shared accounts can be used between family members or business associates

---

## Contracts

##### Payment account
The payment account is the primary method through which end-users (payers) will interact with the system. EGLD or any fungible ESDT may be deposited into the contract. The contract will be deployed by the end-user themselves to enable trustless security of their assets. These assets will be utilized whenever authorized payments are requested from a payment processor and the contract will automatically exchange assets into the amount required in the chosen settlement currency.

To allow payments from a payment processor a user must first allow that action by authorizing the payment. Authorizations may be given for one or multiple debits and for fixed or varying amounts. 3 examples of typical authorizations:

**a) Buying a coffee:** allow one debit with a set maximum fixed amount

**b) Subscribing to a weekly newsletter:** allow unlimited debits but no more than X per week (periods measured in rounds)

**c) Authorizing a debit card issuer:** unlimited debits but with a max payment amount per transaction

A user may have multiple payment accounts if needed. Payment account managers may also choose to “share” access to a payment account, for example, with family members or business associates.

##### Payment processor
The payment processor account is a brokering contract deployed by a third-party to collect payment on behalf or businesses/vendors from authorized payment accounts for a given authorization ID. This third-party payment processor can then payout these businesses either on or off-chain. The ability for fast settlement (faster than block finality) is achieved through withdrawal locking (similar to a “hold” on a credit card), this is explained in more detail in the “brokering trust” section.

To help protect user privacy (particularly time-sensitive, geographical data broadcasts; I.E. I am at X cafe right now purchasing a coffee) - a minimum time period is added to any received funds within which these cannot be paid out. A means of staking and slashing is implemented to ensure processors do not broadcast any data, which could link the payer to the payee, to the blockchain too quickly.

#### Brokering trust between contracts to enable fast finality

In order to resolve transactions quickly (sub-second), for use cases like a debit card, the two parties (payers and processors) can rely on the counterparties code hash being a known good version and the contract being flagged as non-upgradable.

For example, a card issuers can do the following out of band of the transaction:

1) Verify the payment account has a known good version which respects withdrawal locks
2) Verify the payment account is flagged as non-upgradable
3) Verify an active authorization is present for the processor contract and note any limits on amounts or debits

The processor can then monitor events emitted from the payment account for any changes in assets, etc. In conjunction with the monitoring of any token exchange systems, the processor should be able to keep an up-to-date record of the “balance” of any payment account in the authorization settlement token. The processor can then be comfortable that any withdrawal lock and payment request _should_ be able to be settled successfully.

A similar verification process can be done by the payer at authorization time (once only) to ensure that the processor will properly handle privacy:

1) Verify the payment processor has a known good version which respects privacy
2) Verify the payment processor is flagged as non-upgradable
3) Verify contract is staked sufficiently

---

### User flow / interface

More information coming

---

### Supporting off-chain infrastructure

More information coming
