/* 
  The result of a comparison between the entropy of a password and 
  the entropy of the search space equivalent to it. 
  It is always a number between 0 and 1, the greater the stronger.
 
  Please check

  https://en.wikipedia.org/wiki/Password_strength#Entropy_as_a_measure_of_password_strength 

  for a conceptual overview.
*/

const max_break_attempts = 1000000000;
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
const default_alphabet = alphabets[8];

const security_range = {
  "excellent":[80,100],
  "strong":[60,80],
  "good":[40,60],
  "fair":[20,40],
  "weak":[0,20]
}

// HTML presets:
document.getElementById("password_label").innerHTML="Password <small>(min. length)</small> <input id='min_password_length' type='number' value='8' min='0' placeholder='length' style='width:3em' onchange='pwdStrength()'>";
document.getElementById("password").focus();


function format_number(number, digits) {
  // Format numbers for better visualization:
  return number.toLocaleString(undefined,{minimumFractionDigits:digits});
}

function factorial(n) {
  // Mathematical factorial of the number n:
  if (isNaN(n)) {
    return null;
  }
  if (n < 0) {
    return null;
  }
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

function num_combination(n, k) {
  // The number of combinations _with_ repetition of k objects 
  // from a set of n elements:
  return factorial(n + k - 1) / factorial(k);
}

function suffle(array) {
  var  m = array.length, t, i;
  while(m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

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

function clear_data() {
  document.getElementById("password").value = "";
  document.getElementById("security-label").innerHTML = "";
  document.getElementById("parameters").innerHTML = "";
  document.getElementById("password").focus();
}

function getUnique(word) {
  // Returns a list with the unique characters in a given word.
  let unique_values = [];
  let length = word.length;
  for (let i=0; i<length; i++) {
    if (! unique_values.includes(word[i])) {
      unique_values.push(word[i]);
    } 
  }

  return unique_values; 
}

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

function pwdStrength() {
  // Calculates the strenghness of the password:
  let min_password_length = document.getElementById("min_password_length").value;
  let symbol_count = default_alphabet["count"]; 
  let entropy_per_symbol = Math.log(symbol_count) / Math.log(2);
  let alphabet_entropy = min_password_length * entropy_per_symbol;
  let password = "";
  let password_alphabet = [];
  let seed = "";
  let password_length = 0;
  let password_entropy = 0;
  let search_space_entropy = 0;
  let evaluation = "";
  let checkmark = "&#x2713;";

  // Get the value at input each time user type a new character.
  password = document.getElementById("password").value;
  password_length = password.length;

  // Defining the stylistic checkmark:
  checkmark = (password_length >= min_password_length) ? "&#x2713;":""; 

  // The entropy of a same-size random word on the chosen alphabet space 
  // (in bits):
  search_space_entropy = entropy_per_symbol * password_length;

  // The entropy consider the unique symbols in the word as its alphabet space 
  // (in bits):
  password_entropy = word_entropy(password, symbol_count);

  if (password_length < min_password_length) {
    weigth = (password_length * alphabet_entropy) - search_space_entropy;
    metric = password_entropy / (search_space_entropy + weigth);
  } else {
    metric = password_entropy / search_space_entropy;
  }
  evaluation = evaluate(metric);

  password_alphabet = getUnique(password);
  password_alphabet_length = password_alphabet.length;
  seed = password_alphabet.join("");
  
  if (password_length > 0) {
    // Format HTML results:
    document.getElementById("security-label").innerHTML = evaluation;
    let html_text = document.getElementById("parameters").innerHTML = 
      "Password strengthness evaluation: "+evaluation 
      + "<br>"
      + "Evaluated alphabet: "+default_alphabet["name"]
      + "<br>"
      + "Min. expected password length: "+min_password_length 
      + "<br>" 
      + "Alphabet's "+min_password_length+"-length password entropy: "+format_number(alphabet_entropy, 3)+" bits" 
      + "<br>" 
      + "<br>" 
      + "Provided password length: "+password_length+" "+checkmark 
      + "<br>" 
      + "Password entropy: <b>"+format_number(password_entropy, 3)+"</b> bits" 
      + "<br>" 
      + "Alphabet's same-sized password entropy: <b>"+format_number(search_space_entropy, 3)+"</b> bits"
      + "<br>" 
      + "Password alphabet size: <b>"+password_alphabet_length+"</b>"
      + "<br>" 
      + "Password alphabet: "+getUnique(password) 
      + "<br>" 
      + "Max. # of attempts to sweep the password space: "+format_number(num_combination(password_length, symbol_count), 0)
      + "<br>"
      + "Max. # of attempts until break it: "+format_number(num_combination(password_length, password_alphabet_length), 0)
      + "<br>"
      + "<br>"
      + "<button id='simulate_break_it' onclick='breakit()'>Simulate breaking it?</button>"
      + "<br>"
      + "<small>* large passwords can crash your browser.</small>"
      + "<br>"
      + "<small>* The break simulation is performed taking the password alphabet as input. </small>"
      + "<br>"
      + "<br>"
      + "<input id='disable_max_limit' type='checkbox'>"
      + "<label for='disable_max_limit'><small> Disable limit for attempts?</small></label>"
      + "<br>"
      + "<br>"
      +"<span id='break_result'></span>";
  }
}


