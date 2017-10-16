const expect = require('chai').expect;
const dashify = require('./dashify');

describe('dashify', function() {
  it('should return a lowercase string with dashes for spaces', function() {
    expect(dashify('Cape Verde')).to.equal('cape-verde');
  });
  it('should replace opening parenthesis for dashes and remove closing parenthesis', function() {
    expect(dashify('Georgia (State)')).to.equal('georgia--state');
  });
  it('should preserve unicode characters', function() {
    expect(dashify('São Tomé and Príncipe')).to.equal('são-tomé-and-príncipe');
  });
  it('should lowercase unicode characters', function() {
    expect(dashify('Åland')).to.equal('åland');
  });
});
