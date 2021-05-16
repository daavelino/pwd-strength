# pwd-length
A simple Javascript visualization of the strengthness of a password and, optionally, the required effort to break it via simple bruteforce.

#### Usage:
```sh 
git clone https://github.com/daavelino/pwd-strength
cd pwd-strength
python3 -m http.server
```
and point your browser to 
>http://localhost:8000


![Interface](https://github.com/daavelino/pwd-strength/blob/master/imgs/pwd-strength.png)


#### Edit the project parameters:
The used values of 
* **default** minimal password length, (c.f) [NIST sp800-63b:5.1.1.1](https://pages.nist.gov/800-63-3/sp800-63b.html#reqauthtype), 
* **max break attempts**, 
* **default alphabet** and the 
* **security range**

should be changed in the code.js file. 
