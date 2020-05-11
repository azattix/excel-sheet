const model = new Model();

describe("onSearchColumn", function() {

  it("valid column name", function() {
    assert.equal(model.onSearchColumn(''), false);
    assert.equal(model.onSearchColumn(' '), false);
    assert.equal(model.onSearchColumn('A'), false);
    assert.equal(model.onSearchColumn('7'), false);
    assert.equal(model.onSearchColumn('8a'), false);
    assert.equal(model.onSearchColumn('7A'), false);
    assert.equal(model.onSearchColumn('7 A'), false);
    assert.equal(model.onSearchColumn('A 7'), false);
    assert.equal(model.onSearchColumn('A2'), true);
    assert.equal(model.onSearchColumn('a2'), true);
    assert.equal(model.onSearchColumn('ZZ14'), true);
    assert.equal(model.onSearchColumn('a2a'), false);
    assert.equal(model.onSearchColumn('a0'), false);
    assert.equal(model.onSearchColumn('a10-1'), false);
    assert.equal(model.onSearchColumn('a01'), false);
    assert.equal(model.onSearchColumn('23423423'), false);
    assert.equal(model.onSearchColumn('A-1'), false);
    assert.equal(model.onSearchColumn('./../.2342'), false);
  });

});