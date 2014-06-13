describe('watchout', function() {

  describe('creates svg', function() {

    it('should have one svg element', function() {
      var numSvg = d3.selectAll("svg")[0].length
        expect(numSvg).to.be.equal(1);
    });

  });
});
