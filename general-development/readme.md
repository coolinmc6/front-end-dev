[Back](https://github.com/coolinmc6/front-end-dev#front-end-development)
<a name="top"></a>

# General Development

## Errors

Catching errors in an application has a number of layers. Here are the layers from earliest to latest:

1. Feature requirements in the ticket
1. App testing suite
1. Local testing of the feature
1. Self PR review
1. PR review from peers
1. QA evaluation and testing
1. Error logging software: Bugsnag, DataDog, etc.
1. Production smoke test
1. Internal employees logging issues
1. Patrons reporting errors

## Reviewing PRs

### UI Functionality

- Think of non-working states: loading, error, empty. Should something happen WHILE your
request is loading? Does the PR handle it appropriately?

### Performance

- Is there a faster way to do what you're doing?
  - [Measurethat.net: String Includes vs Regex Match & Test](https://www.measurethat.net/Benchmarks/Show/13675/0/regextest-vs-stringincludes-vs-stringmatch)
  - Q: How to use Measurethat.net?

[[↑] Back to top](#top)
