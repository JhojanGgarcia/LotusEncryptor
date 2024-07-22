export const encryptTypes = [
    {
      id: 1,
      title: "KDF",
      name: "Key derivation functions.",
      description:
        "Key derivation functions (KDFs) are a way of generating cryptographic keys from a seed or password. They are used to ensure that the same key is used to derive multiple keys from the same password.",
      tools: ["node-forge"],
    },
    {
      id: 2,
      title: "AES",
      name: "Advanced encryption standard.",
      description:
        "Advanced encryption standard (AES) is a symmetric-key block cipher that uses a 128-bit key to encrypt and decrypt data. It is considered a strong and advanced encryption algorithm.",
      tools: ["node-forge"],
    },
    {
      id: 3,
      title: "RSA",
      name: "Rivest Shamir Adleman.",
      description:
        "Rivest-Shamir-Adleman (RSA) is a public-key encryption algorithm that uses a large number of keys to encrypt and decrypt data. It is considered a strong and advanced encryption algorithm.",
      tools: ["node-forge"],
    },
    {
      id: 4,
      title: "SHA-512",
      name: "Secure Hash Algorithm.",
      description:
        "SHA-512 is a cryptographic hash function that uses a 512-bit hash value to encrypt and decrypt data. It is considered a strong and advanced encryption algorithm.",
      tools: ["crypto"],
    },
  ];