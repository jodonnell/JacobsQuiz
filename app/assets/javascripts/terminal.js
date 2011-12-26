var term;

function termOpen() {
    if ((!term) || (term.closed)) {
        term = new Terminal(
            {
                x: 20,
                y: 20,
                termDiv: 'termDiv',
                bgColor: '#232e45',
                greeting: problemDescription,
                handler: termHandler,
                exitHandler: termExitHandler,
                wrapping: true,
                rows: 50,
                cols: 190
            }
        );
        term.open();
        
        // dimm UI text
        var mainPane = (document.getElementById)?
            document.getElementById('mainPane') : document.all.mainPane;
        if (mainPane) mainPane.className = 'lh15 dimmed';
    }
}

function termExitHandler() {
    // reset the UI
    var mainPane = (document.getElementById)?
        document.getElementById('mainPane') : document.all.mainPane;
    if (mainPane) mainPane.className = 'lh15';
}

function termHandler() {
    // default handler + exit
    this.newLine();
    var parser = new Parser();
    parser.parseLine(this);

    if (this.argv.length > 0) {
        var command = this.argv[this.argc++];
        
        if (this.lineBuffer === 'exit' || this.lineBuffer === 'quit') {
            this.close();
            return;
        }
        else if (this.lineBuffer === 'clear') {
            this.clear();
        }
        else if (this.lineBuffer in recognizedCommands) {
            var subCommand = this.argv[this.argc++];
            var flag = this.argv[this.argc++];
            this.write(recognizedCommands[this.lineBuffer]);
        }
        else {
            this.write(problemDescription);
        }
    }
    this.prompt();
}

$(document).ready(function() {termOpen()});