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
    var command = this.argv[this.argc++];
    
    if (command.match(/^\s*exit\s*$/i)) {
        this.close();
        return;
    }
    else if (command === 'git') {
        var subCommand = this.argv[this.argc++];
        if (subCommand === 'status') {
            this.write('# On branch master\n# Changes not staged for commit:\n#   (use "git add <file>..." to update what will be committed)\n#   (use "git checkout -- <file>..." to discard changes in working directory)\n#\n#	modified:   app/views/home/index.haml\n#\n# Untracked files:\n#   (use "git add <file>..." to include in what will be committed)\n#\n#	app/assets/javascripts/terminal.js\n#	public/assets/\nno changes added to commit (use "git add" and/or "git commit -a")\n')
        }
    }
    else if (this.lineBuffer != '') {
        // echo with write for wrapping, but escape any mark-up
        this.write('You wrote: '+this.lineBuffer.replace(/%/g, '%%'));
        this.newLine();
    }
    this.prompt();
}

$(document).ready(function() {termOpen()});