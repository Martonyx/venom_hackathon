import { Address, getRandomNonce, toNano } from "locklift";

async function main() {
  const json = {
    type: "Basic NFT",
    name: "Sample Name",
    description: "Hello world!",
    preview: {
      source: "https://venom.network/static/media/bg-main.6b6f0965e7c3b3d9833b.jpg",
      mimetype: "image/png",
    },
    files: [
      {
        source: "https://venom.network/static/media/bg-main.6b6f0965e7c3b3d9833b.jpg",
        mimetype: "image/jpg",
      },
    ],
    external_url: "https://venom.network",
  };
  const signer = (await locklift.keystore.getSigner("0"))!;
  const nft = locklift.factory.getContractArtifacts("Nft");
  const index = locklift.factory.getContractArtifacts("Index");
  const indexBasis = locklift.factory.getContractArtifacts("IndexBasis");
  const { contract: sample, tx } = await locklift.factory.deployContract({
    contract: "Sample",
    publicKey: signer.publicKey,
    initParams: {
      nonce: getRandomNonce(),
      owner: `0x${signer.publicKey}`,
    },
    constructorParams: {
      json: JSON.stringify(json),
      codeNft: nft.code,
      codeIndex: index.code,
      codeIndexBasis: indexBasis.code,
    },
    value: locklift.utils.toNano(5),
  });
  console.log(`Sample deployed at: ${sample.address.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
