<%_ $this.target.route.forEach(function(route){ -%>
	app.use('<%- route %>', require('./<%- route %>.route.js'));
<%_ }); -%>