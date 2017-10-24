// code here
reouter.use('<%-$this.$key%>', function(req, res){
	res.json({ route: '<%-$this.$key%>' })
})
// code here