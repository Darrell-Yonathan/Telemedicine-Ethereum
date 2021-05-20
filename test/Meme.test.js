const { assert } = require('chai');

const Upload = artifacts.require('./Upload')

require('chai').use(require('chai-as-promised')).should()


contract('Upload' ,([deployer , seller ,buyer]) =>{
    let img;

    before(async ()=>{
        img = await img.deployed();

    })

    describe('deployement', async() => {
        it('deploys successfully', async ()=>{
            const address = img.address;
            assert.notEqual(address , 0*0)
            assert.notEqual(address , '')
            assert.notEqual(address , null)
            assert.notEqual(address , undefined)
            
        })
    })
    describe('storage', () => {
        it('updates the img Hash' , async()=>{
            let imgHash;
            imgHash= 'abc123'
            await img.set(imgHash)
            const result = await img.get();
            assert.equal(result , imgHash , "the hashes are equal")
        })
    })
    
    
})