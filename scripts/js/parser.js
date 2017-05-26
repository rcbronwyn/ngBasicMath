/* Remove the white spaces from the input, returning an array */

/*Objects that contain the accepted token symbols, their priority for the order of 
operationrs (PEMDAS), and how each function should be performed.*/
var acceptedOperators = [
    {
        symbol: "+",
        priority: 1,
        equation: function(a,b){
            return parseFloat(a) + parseFloat(b);
        }
    },
    {
        symbol: "-",
        priority: 1,
        equation: function(a,b){
            return parseFloat(b) - parseFloat(a);
        }
    },
    {
        symbol: "/",
        priority: 2,
        equation: function(a,b){
            return parseFloat(b) / parseFloat(a);
        }
    },
    {
        symbol: "*",
        priority: 2,
        equation: function(a,b){
            return parseFloat(a) * parseFloat(b);
        }
    }
];



/*evaluateExpression is the main function being called from the directive controller*/
function evaluateExpression(expression){
    var results;
    /*rpnExpression should return an array of tokens converted to reverse polish notation*/
    var rpnExpression = convertToRPN(expression);
    /*results should return the answer to the equation*/
    if( typeof rpnExpression == "string"){
        results = rpnExpression;
    } else {
        results = postFixEvaluation(rpnExpression);
    }
    
    
    return results;
}


// https://en.wikipedia.org/wiki/Shunting-yard_algorithm
// In order to evaluate the string, we need to convert the string to Reverse Polish notation. 
// Instructions can be followed from the link above on how to do so, the function below is 
// an implementation of the instructions on how to convert from infix notation using the
// Shunting-yard algorithm.  It has been simplified to only handle the +, -, /, and * operators.


function convertToRPN(expression){
    /* 1 - Read the token, store tokenized string in the tokens variable*/
    var tokens = tokenizeInput(expression);

    /*Initialize the output que and stack for operators*/
    var output = [];
    var stack = [];
    
    for( var i = 0; i < tokens.length; i++){
        var currentToken = tokens[i];

        /*2 - If the current token is a number, push it to the output que*/
        if(!isNaN(currentToken)){
            output.push(currentToken);
        } else {
            output.push(" ");
        /*3 - If the current token is an operator, then:*/
            
            var currentPriority = getOperatorProperty([currentToken], "priority");
                /*If an error message is returned, stop here and return the message*/
                if(typeof currentPriority == "string" ){
                    return currentPriority;
                }
                 
 

                
            var stackIndex = stack.length;
            /*3a While there is a 2nd Operator token.*/
            if (stackIndex > 0){
                //Reduce the index count by 1
                stackIndex--
                var currentOperator = stack[stackIndex];
                var operatorPriority = getOperatorProperty([currentOperator], "priority");
                
                /*3a_1 and the 1st Operator is less than or equal to that of the 2nd */
                if (operatorPriority >= currentPriority){
                    var token = stack.splice(stackIndex, 1);
                    /*3a_2 push the 2nd operator off the stack*/
                    output.push(token[0]);
                    output.push(" ");
                }
            }
            /*3b Push the first operator off the stack*/
            stack.push(currentToken);
            
        }
        
    }

    /*4 When there are still operators on the stack, push them to the output que.  */
    if(stack.length > 0){
        for(var i = stack.length - 1; i >= 0; i--){
            output.push(" ");
            output.push(stack[i]);
        }
    }

    /*5 Return the output que*/
    return output;
}


/* tokenizeInput takes the string, tokenizes the input and removes the white spaces.*/
function tokenizeInput(expression){
expression = expression.replace(/ /g,'');
return expression.split('');
};

/*Function for looping through the acceptedOperators objects to grab the correct property*/
function getOperatorProperty(token, property, numA, numB){
    
    for (var i = 0; i < acceptedOperators.length; i++){
        
        /*If the token provided is in the acceptableOperators as a symbol */
        if (token == acceptedOperators[i].symbol){
          /*If the numA and numB are provided (only if you're trying to call the equation function)*/
          if( numA != null && numB != null){
            return acceptedOperators[i][property](numA,numB);
          } else {
              /*Otherwise*/
               return acceptedOperators[i][property];
          }
        } 
    }
    return errorMessage("operator", token);
            
   
}

/*Helper Function for generating error messages*/
function errorMessage(error, item){
    var message="";

    if (error == "operator"){
      message =  "Sorry, the " + item + " is not a valid character, please remove it from the input.";

    }
    if (error == "results"){
      message =  "Sorry, the equation above is incomplete or does not return a number.";
      
    }

     return message; 

}





/*https://en.wikipedia.org/wiki/Reverse_Polish_notation */
// Once the string is in RPN, we need to evaluate it.  The link above
// contains an algorithm on how to evaluate it, and this function is an 
// implementation of that algorithm.
function postFixEvaluation(rpnArray){
    //Initialize an array to hold the results.
    var results = [];
    rpnArray = rpnArray.join('').split(" ");

    /*1)  While there are tokens left, read the next token from the input.*/
    for (var i = 0; i < rpnArray.length; i++){
        /* 2 If the token is a number, add it to the results.    */
        if(!isNaN(rpnArray[i])){
            results.push(rpnArray[i]);
        } else {
            /* 3 Otherwise the token is an operator */
            var numA = results.pop();
            var numB = results.pop();
            /* 4 Pop the top two values from the stack, and evaluate.  In ourcase, we call the equation function from the acceptableTokens array. */
            results.push(  getOperatorProperty(rpnArray[i], "equation", numA, numB) );

                
        }

    
    }
           
    // If the result is a number, return it.  If not, generate an error message.
    if (!isNaN(results)){
        return results.pop();
    } else {
        return errorMessage("results", null);
    }
    

        
    

}

