const randomUniqueStrings = new Set<string>();

function createUniqueRandomString(): string {
  const randomString = Math.random().toString(36).substring(2, 15)

  if (randomUniqueStrings.has(randomString)) return createUniqueRandomString()
  
  randomUniqueStrings.add(randomString)

  console.log(randomString)

  return randomString
}

export default createUniqueRandomString