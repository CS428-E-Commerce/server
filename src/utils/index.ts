export function generateRandomString(length?: number): string {
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString: string = '';
    const lengthString = length ? length : 6;
  
    for (let i = 0; i < lengthString; i++) {
      const randomIndex: number = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
  }