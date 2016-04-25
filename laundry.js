
var fs = require('fs');
var content = "";
var casper = require('casper').create({
    verbose: false,
    logLevel: 'debug',
    pageSettings: {
         loadImages:  false,         // The WebPage instance used by Casper will
         loadPlugins: false,         // use these settings
         userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    }
});

var url = 'https://www.mywavevision.com/';

casper.start(url, function() {
    this.fill('form#FormMain', {
        'txtUserID' : 'campbell',
        'txtPassword' : 'campbell2016'
    });
    this.click('input[type="submit"][id="btnLogin"]');
});

casper.then(function() {
    this.echo('Waiting 5s...');
    casper.wait(5000, function() {
        this.echo("Done");
    });
});

casper.then(function() {
    // Grab a screenshot of the page because reasons
    this.echo("Printing screenshot of the page");
    this.capture('test.png');
});

casper.then(function() {

    this.echo("Grabbing table inside iFrame");

    // Switch view to the relevant iframe
    this.page.switchToChildFrame(2);

    // evaluate using regular jquery
    raw_table = this.evaluate( function () {
    	var main_table = document.getElementById('ContentPlaceHolder1_gvRoom');
        //console.log(main_table.innerHTML);
        return main_table.innerHTML;
    });

    // Print to file
    try {
        fs.write("/home/joel/workspace/git_repos/1614laundry/table.html", raw_table, 'w');
    } catch(e) {
    	console.log(e)
    }

});


casper.run();

