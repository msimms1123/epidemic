const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';

function printBad(msg) {
  console.log(`${RED}${msg}${RESET}`);
}

function printGood(msg) {
  console.log(`${GREEN}${msg}${RESET}`);
}

class TF {

  constructor(title) {
    this.title = title || 'Test';
    this.totalErrors = 0;
    this.totalSuccess = 0;
    this.start();
  }

  test(testName, testfn) {
    try {
      testfn();
      printGood(`+ Test ${testName} passed.`);
      this.totalSuccess++;
    } catch (err) {
      printBad(`- Test "${testName}" failed: ${err}`);
      console.log(err);
      this.totalErrors++;
    }
  }

  compare(a, b, msg) {
    if (a !== b) {
      msg = msg || `${RED}Expected equal: ${a} != ${b}${RESET}`;
      throw new Error(msg);
    }
  }

  ok(a, msg) {
    if (!a) {
      msg = msg || `${RED}Expected ok${RESET}`;
      throw new Error(msg);
    }
  }

  start() {
    this.totalErrors = 0;
    this.totalSuccess = 0;
    console.log(` - - - ${this.title} - - - `);
  }

  end() {
    let printfn = this.totalErrors > 0 ? printBad : printGood;
    printfn(`- - - ${this.title} - - - `);
    console.log(`${GREEN}   Total Successful Test : ${this.totalSuccess}${RESET}`);
    if (this.totalErrors > 0) {
      console.log(`${RED}   Total Failed Test     : ${this.totalErrors}${RESET}`);
    }
    printfn(`- - - - - - `);
  }

}

export default TF;
