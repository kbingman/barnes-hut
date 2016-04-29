# Barnes Hut Tree N-Body Demo

Running the app
```
npm install
npm start
```

There are a few tests, run them with
```
npm test
```
## Steps for adding each particle to the array
1. No particle exists, add it and be done with it
2. Particle exists. Create children, move both new and old particle to the correct children, move on to next
3. Children exist. Find correct child and repeat the procedure
