const { assert } = require('chai');

const Meme = artifacts.require('./Meme')

require('chai').use(require('chai-as-promised')).should()


contract('Meme' ,([deployer , seller ,buyer]) =>{
    let meme;

    before(async ()=>{
        meme = await Meme.deployed();

    })

    describe('deployement', async() => {
        it('deploys successfully', async ()=>{
            const address = meme.address;
            assert.notEqual(address , 0*0)
            assert.notEqual(address , '')
            assert.notEqual(address , null)
            assert.notEqual(address , undefined)
            
        })
    })
    describe('storage', () => {
        it('updates the meme Hash' , async()=>{
            let memeHash;
            memeHash= 'abc123'
            await meme.set(memeHash)
            const result = await meme.get();
            assert.equal(result , memeHash , "the hashes are equal")
        })
    })
    
    
})