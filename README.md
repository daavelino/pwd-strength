# pwd-length
A simple Javascript visualization of the strengthness of a password and, optionally, the required effort to break it via simple bruteforce.

![Interface](https://github.com/daavelino/pwd-strength/blob/master/imgs/pwd-strength.png)

## Usage:
```sh 
git clone https://github.com/daavelino/pwd-strength
cd pwd-strength
python3 -m http.server
```

Point your browser to 
>http://localhost:8000

### Edit the project parameters:
The used values of 
* **minimal password length**, 
* **max break attempts**, 
* **default alphabet** and the 
* **security range**

should be changed in the code.js file. 
