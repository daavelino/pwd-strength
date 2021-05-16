# pwd-length
A simple visualization of the strengthness of a password based on its entropy and, optionally, the required effort to break it via simple bruteforce.

This project tries to address and propose a solution for the comment at [NIST SP 800-63-b, Appendix A—Strength of Memorized Secrets](https://pages.nist.gov/800-63-3/sp800-63b.html#appendix-astrength-of-memorized-secrets) which says:

_Complexity of user-chosen passwords has often been characterized using the information theory concept of entropy [Shannon]. While entropy can be readily calculated for data having deterministic distribution functions, estimating the entropy for user-chosen passwords is difficult and past efforts to do so have not been particularly accurate. For this reason, a different and somewhat simpler approach, based primarily on password length, is presented herein._

Actually , estimate the entropy of user-chosen passwords is not that difficult or inaccurate as NIST says. And conceptually, it should be taken into consideration since primarily base the quality of a password in its length can lead to other problems instead of solving them. 
For example, the password 

`000000000000000000000000000000000000000` (40 digits)

is very large but in no way a good one. A combination of both, entropy and size should be the best approach to address the question and that is what this project is about.

So, let's calculate some entropy for user-chosen passwords and check how difficult, in fact, it is.

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

The password **length** is not really a requirement but an alternative to achieve an acceptable strenghtness level. If it is not possible to generate a short password with good entropy, a large one but less random would work well. Of course, it doesn't really help if the password is large, but composed only with a few symbols, since it make them easily breakable, **as this project can show**. Besides that, it is usually easier to create meaningful passwords when they are large so it helps in memoriz them (secrecy). 

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
