let provider = new ethers.providers.Web3Provider(window.ethereum)
let signer 

async function connectMetaMask() {

await provider.send("eth_requestAccounts", []);

signer = await provider.getSigner();

console.log("Account address s:", await signer.getAddress())


}

async function mintOrSelect(element)  {
      
    if(signer == undefined) {
        alert("connect your metamask")
    }
    if(window.nftScore < 1) {
        alert("you need score to mint nft")
        return
    }
    const skinsContractAddress = "0x236AA4Db0837A058C09Cd1329177dd4Cc024fe52"




}