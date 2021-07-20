# Links App

## Todo

### Test DB

- define fgu configs for prod, dev, and testing
- define mock data that fgu will upload to test db
- write `useTestDB` and `wipeTestDB` scripts to call in tests (use Node `child_process.exec` to run shell commands)
- perhaps create a new db instance per test file and pass `fgu` [configs via cli params](https://fgu-docs.com/configuration/config-file)
- use `faunadb` client to unit test db fns
