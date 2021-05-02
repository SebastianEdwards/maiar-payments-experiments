Uses observers to keep track of the state of all payment accounts with attached card authorizations.

Tracks available estimated "balance" - the total value if all liquidatable assets were converted to card settlement token.

Service responds to requests from Stripe Issuing API to approve/deny transactions.

Service initiates the settlement of funds via Card Issuer SC.
