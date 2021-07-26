const { assert } = require('chai');
let Upload = artifacts.require('./src/abis/Upload')
require('chai').use(require('chai-as-promised')).should()

let imgHash;
let id;
let nama;
let deskripsi;
nama = 'Testing'
deskripsi = 'Penyakit yang diderita cukup kronis karena muncul nanah di sekitar jerawat dan mengakibatkan kulit cukup kering. Pasien juga mengeluh agak sedikit pusing dan nyeri di bagian sekitar jerawat'
imgHash= 'QmaW9nHYT5VnenaqaTbuhV93YM9az3wEJjQyJnXfr3n3Ai'

contract('Upload' ,([deployer , seller ,buyer]) =>{
    let img;

    before(async ()=>{
        Upload = await Upload.deployed();
    })
    describe('set', () => {
        for(x=0;x<1;x++){
        it('set telemedicine data' , async()=>{

            await Upload.set(x.toString(),nama,deskripsi,imgHash)
           
        })
    }
    })
    describe('get', () => {
        for(x=0;x<1;x++){
        it('get telemedicine data' , async()=>{

            const result = await Upload.get(x.toString());
            assert.equal(result[0], nama , "the name are not equal")
            assert.equal(result[1], deskripsi , "the description are not equal")
            assert.equal(result[2], imgHash , "the hashes are not equal")
        
        })}
    })  
})