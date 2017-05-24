<h1>ngBasicMath</h1>

<h2>The Problem</h2>
<p>Create an AngularJS directive that includes a text input element.</p>
<ol> 
    <li>Any text the user enters should be analyzed and a response output onto the page.</li>
    <li>The input should accept simple equations, such as "2 + 3 / 2" and then output the appropriate answer, paying attention to the order of operations (multiplication or division left to right, then addition or subtraction left to right). +, -, /, *, and optional spaces are the only symbols that need to be accepted, and you cannot use the eval function or anything similar.</li>
    <li>If the input is not valid, the output text should change to indicate this to the user. </li>
</ol>

<h2>The (thought) Process</h2>
<p>Without being able to use eval(), I understood that I would need to parse the string, but my initial issue was that I couldn't think of a way to appropriately figure out what came before and after an operator multiple times without having to loop through the array of tokens over and over and over again.  There had to be a different way.  So that led me to finding Reverse Polish Notation, and the Shunting-yard Alogrithm to convert infix expression to RPN.</p>

<h3>Angular App</h3>
<p>My angular application consists of three things:</p>
<ol>
    <li>A controller which returns the results and calls the function to evaluate the input.</li>
    <li>a Template that creates the input and returns the results when the equation is evaluated.</li>
    <li>and A directive that calls the template.</li>
</ol>
<p>Since we did not want to have a separate error message, if the result was an error found inside the parser.js file, an error message is returned as a result instructing the user as to what is wrong.</p>

<h3>Algorithm Implementation</h3>
<p>I created an array of objects for each acceptable operator per the requirements ( +, -, /, *) assigned them a priority, and stored a function in each that would perform the desired calculations when called upon.  I then took the expression through the conversion to RPN, and then evaluated the postfix expression. </p>
    
<h2>Testing</h2>
<p>I set up a few tests using Mocha and Chai.</p>

<h2>To Install:</h2>
<p>npm install to install dependencies</p>
<h2>To Run Tests:</h2>
<p>npm test</p<