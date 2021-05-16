# pwd-length
A **concept** intended to calculate the strengthness of a password based on its entropy and, optionally, a simulation about the required effort to crack it via simple bruteforce.

This project tries to address and propose a solution for the comment at [NIST SP 800-63-b, Appendix A—Strength of Memorized Secrets](https://pages.nist.gov/800-63-3/sp800-63b.html#appendix-astrength-of-memorized-secrets) which says:

_Complexity of user-chosen passwords has often been characterized using the information theory concept of entropy [Shannon]. While entropy can be readily calculated for data having deterministic distribution functions, estimating the entropy for user-chosen passwords is difficult and past efforts to do so have not been particularly accurate. For this reason, a different and somewhat simpler approach, based primarily on password length, is presented herein._

Actually, estimate the entropy of user-chosen passwords is not that difficult or inaccurate as has been stated on the NIST's document. And, as a matter of completeness, it should be taken into consideration since primarily basing the quality of a password in its length can lead to problems instead of solving the issue. 
For example, the password 

`000000000000000000000000000000000000000` (40 digits)

is very large but in no way a good one. A combination of both, entropy and length should be the best approach to address the question and that is what this project is about. 

> As a matter of comparison, this project categorize the password above as `weak`. [howsecureismypassword.net](https://howsecureismypassword.net/) says it would be required **7 hundred quintillion years** to crack it. Which one makes more sense to you?

In any case, let's calculate some entropy for user-chosen passwords and check how difficult, in fact, it is to crack it. I bet you'll be surprised by the results.

Enjoy!

#### Usage:
```sh 
git clone https://github.com/daavelino/pwd-strength
cd pwd-strength
python3 -m http.server
```
and point your browser to 
>http://localhost:8000

You should see the following page:

![Interface](https://github.com/daavelino/pwd-strength/blob/master/imgs/pwd-strength.png)

#### Edit the project parameters:
The following values can only be changed in the code.js file:

* **default** minimal password length,
* **max break attempts**, 
* **default alphabet** and the 
* **security range**

## Some considerations about passwords:

#### What are passwords?
Passwords are those sequences of characters required as a proof of identity in an authentication system. A more interesting question, however, would be _what passwords are used for?_ They are used as a testemony (or token) of an identity. Authentication systems are instructed to associate a system-user identity to an entity, or claimant (a human being, a computer, a software, etc..), once this entity provides the correct password. (More specifically, once the entity provides the correct set of credential information, which could be the combination of _username_ and _password_ or even an additional authentication factor.

#### What makes a good password?
Basically, the following two things
* Its entropy (to make it hard to guess)
* Its secrecy (to make it hard to be used by others)

The password **length** is not really a requirement but an alternative to achieve an acceptable strenghtness level. If it is not possible to generate a short password with good entropy, a large one but less random would work well. Of course, it doesn't really help if the password is large, but composed only with a few symbols, since it make them easily crackable, **as this project can show**. Besides that, it is usually easier to create meaningful passwords when they are large so it helps in memoriz them (secrecy). 

#### A personal note about leaked password lists:
Lists of leaked passwords became are very popular nowadays and even became incorporated into some products as a mean to avoid leaked passwords reuse on some services. They are also used to compose those famous lists of "Top most used passwords of the year" and even NIST recommend their usage (see below). I personally discourage the usage of such lists for 2 reasons:
1. the **moral aspects** of using leaked data to address a problem. (even thought the data is "anonimyzed"), 
2. the **lack of purpose** in using these lists instead of address the real problem of creating better passwords. This is the laziness solution for the problem.

My point considers the following things:
1. mathematically, **most of those most used passwords are good passwords**. The problem is that they became somehow guessable and that's what we should help to solve. Enabling ordinary people to create good passwords.
2. **Passwords will be eventually reused** and there's nothing we can do about it. It is a mathematical fact! If you don't believe me, [at least their hashes will](https://en.wikipedia.org/wiki/Hash_collision_(computer_science)!
3. The reason why we have such a prevalent passwords (on the leaked lists) is not really known. It might be that people just keep using them in all the services they use but also that **they choose to use them in services they don't care that much and keep the good ones for the services they do really care**. Observe the second one is interesting because it could provide an idea to business designers about how necessary the authentication mechanism in their services really is. I have the impression that nowadays authentication is supposed to be provided by default, even thought that the usage of passwords that cannot assure authentication is still relevant. Many people give up using a determined service after a trial or two and, since even for a trial a password is required, **it is not a bad strategy to use bad passwords for this purpose**. I think what happens in these cases is that,if the person likes the system, he or she changes the password for a good one. If not, eventually those passwords leak and end composing those refered lists. But it is reallly hard to understand what is the case nowadays... My idea here is just offer another perspective to the problem.

#### NIST sp-800-63b:
* NIST sp-800-63b, _Digital Identities Guidelines - Authentication and Lifecycle Management_ (June 2017, includes updates as of 03-02-2020) in its [Section 5.1: Requirements by Authenticator Type](https://pages.nist.gov/800-63-3/sp800-63b.html#reqauthtype) says:
> Memorized secrets SHALL be at least 8 characters in length if chosen by the subscriber. Memorized secrets chosen randomly by the CSP or verifier SHALL be at least 6 characters in length and MAY be entirely numeric.

By "Memorized secrets" NIST means: _A Memorized Secret authenticator — commonly referred to as a password or, if numeric, a PIN — is a secret value intended to be chosen and memorized by the user._

It is interesting to notice what follows from NIST's definition: _Memorized secrets need to be of sufficient complexity and secrecy that it would be impractical for an attacker to guess or otherwise discover the correct secret value. A memorized secret is something you know._

So, according to the definition, Memorized secrets need to be of **sufficient complexity** and secrecy that it would be impractical for an attacker to **guess** or otherwise **discover** the correct secret value.

Let us assume for a moment that secrecy is a well understood concept and let us evaluate what _of sufficient complexity_ means.

The document provides an appendix [Appendix A—Strength of Memorized Secrets](https://pages.nist.gov/800-63-3/sp800-63b.html#appendix-astrength-of-memorized-secrets) where we can find some information about complexity:

1. A.1 Introduction:_Complexity of user-chosen passwords has often been characterized using the information theory concept of entropy [Shannon]. While entropy can be readily calculated for data having deterministic distribution functions, estimating the entropy for user-chosen passwords is difficult and past efforts to do so have not been particularly accurate. For this reason, a different and somewhat simpler approach, based primarily on password length, is presented herein._ **(*Notice: that estimate the entropy for user-chosen passwords is precisely what this pwd-strength is about.)**
2. A.2 Length: _Users should be encouraged to make their passwords as lengthy as they want, within reason. Since the size of a hashed password is independent of its length, there is no reason not to permit the use of lengthy passwords (or pass phrases) if the user wishes. Extremely long passwords (perhaps megabytes in length) could conceivably require excessive processing time to hash, so it is reasonable to have some limit._
3. A.3 Complexity: _For this reason, it is recommended that passwords chosen by users be compared against a “black list” of unacceptable passwords. This list should include passwords from previous breach corpuses, dictionary words, and specific words (such as the name of the service itself) that users are likely to choose. Since user choice of passwords will also be governed by a minimum length requirement, this dictionary need only include entries meeting that requirement._

So it seems that the criteria to determine if a user-choosen password is good enough needs to take into consideration the complexity of the password but an objective criteria to determine password's complexity is still missing.

## How the project works?

#### The project structure:
The project has been splitted into 2 files: `code.js` and `index.html`. code.js deals with all Javascript code required to build and process the data. index.html is the HTML 'holder' of the project, that receives the input from the user and present the results.

#### How the password entropy is calculated?
The password entropy is calculated by using the function `word_entropy(word, alphabet_length)`:

```javascript
function word_entropy(word, alphabet_length) {
  // H = L (log N / log 2), where L is the number of symbols in the word 
  // and N is the number of possible symbols in the alphabet 
  // (or the alphabet size).
  // Returns the entropy value in bits or zero, for a word with length 0:
  if (word.length == 0) {
    return 0;
  } else {
    L = getUnique(word);
    L = L.length;
    return L * (Math.log(alphabet_length) / Math.log(2));
  }
}
```
The idea here is to apply the Boltzmann formula for the entropy `S = kln(omega)` where `omega` is the number of accessible states of a system, which is N^L, where L is the number of symbols in the password i.e. its alphabet and N is the number of possible symbols in a given alphabet, used to generate the password. Check [here](https://en.wikipedia.org/wiki/Password_strength#Entropy_as_a_measure_of_password_strength) for a detailed explanation. A simple math reveals that the value of the password entropy H would be 
`H = L(log N /log 2`,
providing the value of the entropy in terms of the number of bits. (That's the reason why it is necessary to divide it by log 2).

That's how the password entropy is calculated in this project. Notice that, if the length of the password is 0, its entropy is also zero.

The function `getUnique(word)` is used here to compute the number of unique symbols in a given password.

#### How the evaluation's metric is calculated?
The metric is computed by the following code:
```javascript
if (password_length < min_password_length) {
    weigth = (password_length * alphabet_entropy) - search_space_entropy;
    metric = password_entropy / (search_space_entropy + weigth);
  } else {
    metric = password_entropy / search_space_entropy;
  }
```
which takes into consideration:
* the password length, `password_length`
* the minimal password length ,`min_password_length`
* the password entropy, `password_entropy`
* the searching space entropy, `search_space_entropy`

The general idea is that the metric should be a comparison between the password entropy and the search space entropy so the straightforward way of defining it would be:

`metric = password_entropy / search_space_entropy;`

The searching space entropy can be understood as the best of all values for the entropy. The entropy of a password is never greater than the entropy of the searching space entropy, because the searching space entropy is defined as:

```javascript
// The entropy of a same-size random word on the chosen alphabet space 
// (in bits):
  search_space_entropy = entropy_per_symbol * password_length;
```
and, the entropy per symbol `entropy_per_symbol` is a "constant" that depends only on the number of symbols in a given alphabet. So, if a word is composed by using a given alphabet, the maximum entropy it could have is described by the 'search_space_entropy' value. The name 'search_space_entropy' was chosen taking into consideration the required effort to randomly search for a given word in a space generated by the given alphabet.

Although good, calculating the metric this way doesn't take into consideration the lenght of the password. For example, if one chooses a password of length 3 and uses 3 different symbols to generate this password, it would be considered _excellent_ by the evaluator, which is not a good idea. So it has been introduced the concept of weight based on the length of the password:

`weigth = (password_length * alphabet_entropy) - search_space_entropy;`

which can be understood as a kind of "penalty" for not being "compliant" with the rules of the system. It does make sense since it is very well known that small-length password can be quickly cracked. (an 8-digit length one can be cracked in a matter of minutes on modern end-user computers).

So, if a password length is smaller than what is required for that to be, there is a penalty to be applied on it so the complete calculation of the metric becomes:

```javascript
  if (password_length < min_password_length) {
    weigth = (password_length * alphabet_entropy) - search_space_entropy;
    metric = password_entropy / (search_space_entropy + weigth);
  } else {
    metric = password_entropy / search_space_entropy;
  }
```
Notice that the calculation of the weigth involves a variable called `alphabet_entropy = min_password_length * entropy_per_symbol;`. In this case, the weigth can be expanded as:

`weight = (password_length * (min_password_length * entropy_per_symbol)) - search_space_entropy`

and, since the weight is applied on the denominator of the metric, it would perform as a good penalty. If you decide for an implementation of this concept, **here is a good point to consider a tuning**.

#### How the password evaluation is performed?
Once the password metric is calculated, the value is passed to the function `evaluate(metric)`:
```javascript
function evaluate(metric) {
  // Evaluates the password metric in terms of the security range:
  if (! metric) {
    return "";
  }
  const range_keys = Object.keys(security_range);
  for (let i=0;i<range_keys.length;i++) {
    let actual_key = range_keys[i];
    let min = security_range[actual_key][0] / 100;
    let max = security_range[actual_key][1] / 100;
    if (metric >= min && metric <= max) {
      return actual_key;
    }
  }
}
```
which uses what was defined at the `security_range` variable to attribute an evaluation to the password. Actually, it counts with 5 different values, equally weightened:

```javascript
const security_range = {
  "excellent":[80,100],
  "strong":[60,80],
  "good":[40,60],
  "fair":[20,40],
  "weak":[0,20]
}
```
So, the value at each key is divided by 100 to create an uniform range of evaluation. The metric is compared against those ranges and the value returned.

#### What is the role of the alphabets?
The alphabets are defined in the variable `alphabets`:
```javascript
const alphabets = {
  1:{"name":"Arabic numerals (0–9)","count":10},
  2:{"name":"hexadecimal numerals (0–9, A–F)","count":16},
  3:{"name":"Case insensitive Latin alphabet (a–z or A–Z)","count":26},
  4:{"name":"Case insensitive alphanumeric (a–z or A–Z, 0–9)","count":36},
  5:{"name":"Case sensitive Latin alphabet (a–z, A–Z)","count":52},
  6:{"name":"Case sensitive alphanumeric (a–z, A–Z, 0–9)","count":62},
  7:{"name":"All ASCII printable characters except space","count":94},
  8:{"name":"All ASCII printable characters","count":95},
  9:{"name":"All extended ASCII printable characters","count":218},
  10:{"name":"Binary (0–255 or 8 bits or 1 byte)","count":256},
  11:{"name":"Diceware word list","count":7776}
};
```
and represent the most common choices of symbols to be used as a password. They also present the number of different symbols each alphabet holds, making it simple to compute along the code. The list was obtained [here](https://en.wikipedia.org/wiki/Password_strength#Random_passwords), but it is not difficult to compute from the scratch.

In other words, the aphabet provides the "seed" to calculate the `alphabet_entropy`, here:

```javascript
  let symbol_count = default_alphabet["count"];
  let entropy_per_symbol = Math.log(symbol_count) / Math.log(2);
  let alphabet_entropy = min_password_length * entropy_per_symbol;
```

#### How the "Simulate break it?" function works?
The breaking (cracking) simulation is trigged by the function `breakit()`:
```javascript
function breakit() {
    let limit = max_break_attempts;
    let disable_max_limit = document.getElementById("disable_max_limit").value;
    let password = document.getElementById("password").value;
    let password_length = password.length;
    let password_alphabet = getUnique(password);
    let passwords = word_generator(password_alphabet, password_length);
    let counter = 1;
    let tmp;

    while(tmp = passwords.next()) {
      if (counter > limit && disable_max_limit === "on") {
        document.getElementById("break_result").innerHTML = "Max. attempts limit reached: "+format_number(limit)+". Not broken.";
        break;
      }
      if (tmp.value === password) {
        document.getElementById("break_result").innerHTML = "Found! Attempts until find it (random start): "+format_number(counter);
        break;
      }
      counter = counter + 1;
  }
  return counter;
}
```
It depends on two "hidden" variables, `max_break_attempts` and `disable_max_limit`, which are responsible for control the number of attempts until find the corresponding password. The first is defined at code.js. The second is passed when the user marks the checkbox "Disable limit for attempts?" on the HTML page. It also depends on the function `word_generator(password_alphabet, password_length)`:

```javascript
function* word_generator(array, size) {
  // Generates all possible combinations of size-length words 
  // from an array of characters: 
  let tmp = suffle(array);
  let chars = tmp.join("");

  //Generate the first word for the password length 
  //by the repetition of first character.
  let word = (chars[0] || '').repeat(size);
  yield word;

  //Generate other possible combinations for the word
  //Total combinations will be chars.length raised to power of word.length
  //Make iteration for all possible combinations
  for (j = 1; j < Math.pow(chars.length, size); j++) {

    //Make iteration for all indices of the word
    for(k = 0; k < size; k++) {

      //check if the current index char need to be flipped to the next char.
      if(!(j % Math.pow(chars.length, k))) {

        // Flip the current index char to the next.
        let charIndex = chars.indexOf(word[k]) + 1;
        char = chars[charIndex < chars.length ? charIndex : 0];
        word = word.substr(0, k) + char + word.substr(k + char.length);
      }
    }
    yield word;
  }
}
```
that basically uses combinatorics to create all words of `size` length consider the symbols at the `array` parameter.
TThe idea is, instead of bruteforce all possible words in a given space, it generates all possible same-size words that use only the symbols present in the alphabet. That makes the bruteforce easier but still relevant.

**Note**: This is just a simulation. If you are really interesting in understand how much is required to crack a password, please consider the value displayed at `Max. # of attempts to sweep the password space:`. It can give you a much more precise metric. **The breaking here is performed having the knowledge of the password alphabet, which is generally not the case in real world scenarios**.

#### Why the default password length is 8-characters long?
This decision has been taken considering what is recommended by the NIST sp-800-63b, _Digital Identities Guidelines - Authentication and Lifecycle Management_ (June 2017, includes updates as of 03-02-2020) in its [Section 5.1: Requirements by Authenticator Type](https://pages.nist.gov/800-63-3/sp800-63b.html#reqauthtype):

_Memorized secrets SHALL be at least 8 characters in length if chosen by the subscriber. Memorized secrets chosen randomly by the CSP or verifier SHALL be at least 6 characters in length and MAY be entirely numeric_.

#### What is the rest of the code about?
The rest of the code is about make usability user-friendly so basically producing the HTML features to retrieve and present data.

## TODO:
I assume this concept as done, but there is always something else that could be better. For example, a good code review would be appreciated, simplifying the code readability, double-checking the parameters passed and encapsulating 'loose' pieces of the code into functions (e.g. the metric calculation).

This will be done with time...
