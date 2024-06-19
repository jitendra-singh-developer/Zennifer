export default function consoleLog() {
   // get all the arguments passed to the function
    var args = Array.prototype.slice.call(arguments);
    // generate a JSON string of the arguments, which will be used for logging
    var argsString = JSON.stringify(args);

    // log the arguments to the console
    console.log(JSON.parse(argsString));
}