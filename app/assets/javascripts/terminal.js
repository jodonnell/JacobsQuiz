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
        
        if (command === 'exit' || command === 'quit') {
            this.close();
            return;
        }
        else if (command === 'clear') {
            this.clear();
        }
        else if (command === 'git') {
            var subCommand = this.argv[this.argc++];
            var flag = this.argv[this.argc++];
            if (subCommand === 'status') {
                this.write('# Changes not staged for commit:\n#   (use "git add <file>..." to update what will be committed)\n#   (use "git checkout -- <file>..." to discard changes in working directory)\n#\n#	modified:   Gemfile\n#\nno changes added to commit (use "git add" and/or "git commit -a")\n')
            }

            if (subCommand === 'add' && flag == '-p') {
                this.write('diff --git a/Gemfile b/Gemfile\nindex 3651937..27ffdb5 100644\n--- a/Gemfile\n+++ b/Gemfile\n@@ -13,7 +13,7 @@ gem "devise", "1.5.3"\n gem "haml", "3.1.4"\n gem "heroku", "2.17.0"\n # To use debugger\n-# gem "ruby-debug19", :require => "ruby-debug"\n+gem "ruby-debug19", :require => "ruby-debug"\n \n group :test do\n   gem "turn", :require => false\nStage this hunk [y,n,q,a,d,/,j,J,g,e,?]? n\nn\n@@ -22,6 +22,7 @@ end\n group :development, :test do\n   gem "rspec-rails", "~> 2.7"\n   gem "sqlite3", "1.3.5"\n+  gem "webrat"\n end\n \n group :production do\nStage this hunk [y,n,q,a,d,/,K,g,e,?]?')
            }
        }
        else if (this.lineBuffer != '') {
            // echo with write for wrapping, but escape any mark-up
            this.write('You wrote: '+this.lineBuffer);
            this.newLine();
        }
    }
    this.prompt();
}

$(document).ready(function() {termOpen()});