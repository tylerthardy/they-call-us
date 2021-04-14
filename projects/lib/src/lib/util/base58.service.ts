import { Injectable } from '@angular/core';
import * as jsbn from 'jsbn';
/// <reference types='jsbn' />

@Injectable({
    providedIn: 'root'
})
// Transcribed from https://incoherency.co.uk/base58/
export class Base58Encoder {
    private readonly HEX_ALPHABET = '0123456789abcdefABCDEF';
    private readonly ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';

    private bigRadix: jsbn.BigInteger = new jsbn.BigInteger('58');

    encodeFromHex(input: string): string {
        const stripped = this.stripInvalid(input, this.HEX_ALPHABET);
        const byteArray = this.fromHex(stripped);
        return this.encode(byteArray);
    }

    encodeFromAlphanumeric(input: string): string {
        const stripped = this.stripInvalid(input, this.ALPHABET);
        const byteArray = this.fromHex(stripped);
        return this.encode(byteArray);
    }

    private stripInvalid(input: string, alphabet: string): string {
        let result = '';
        for (let charIdx = 0; charIdx < input.length; charIdx++) {
            if (alphabet.indexOf(input.charAt(charIdx)) !== -1) {
                result += input.charAt(charIdx);
            }
        }
        return result;
    }

    private fromHex(input: string): number[] {
        const result: number[] = [];

        if (input.length % 2 !== 0) {
            input = '0' + input;
        }

        for (let charIdx = 0; charIdx < input.length; charIdx += 2) {
            result.push(parseInt(input.substr(charIdx, 2), 16));
        }

        return result;
    }

    private stringToByteArray(input: string): number[] {
        const output = [];
        for (let i = 0; i < input.length; i++) {
            output.push(input.charCodeAt(i));
        }
        return output;
    }

    private byteArrayToString(input: number[]): string {
        let output = '';
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < input.length; i++) {
            output += String.fromCharCode(input[i]);
        }
        return output;
    }

    // take byte array as input, give string as output
    private encode(input: number[]): string {
        // create a copy with an extra leading 0 byte so that BigInteger
        // doesn't treat 'plain' as a two's-complement value
        const plainWithLeadingZero = input.slice();
        plainWithLeadingZero.unshift(0);
        const x = new jsbn.BigInteger(plainWithLeadingZero, 256);

        let output = '';

        while (x.compareTo(jsbn.BigInteger.ZERO) > 0) {
            const mod = new jsbn.BigInteger(null);
            x.divRemTo(this.bigRadix, x, mod);
            output = this.ALPHABET.charAt(Number(mod.toString())) + output;
        }

        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < input.length; i++) {
            if (input[i] !== 0) {
                break;
            }
            output = this.ALPHABET.charAt(0) + output;
        }

        return output;
    }
    // take string as input, give byte array as output
    private decode(encoded: string): number[] {
        if (encoded === '') {
            return [];
        }

        let answer = new jsbn.BigInteger('0');
        const j = new jsbn.BigInteger('1');

        for (let strIdx = encoded.length - 1; strIdx >= 0; strIdx--) {
            const tmp = this.ALPHABET.indexOf(encoded.charAt(strIdx));
            if (tmp === -1) {
                // TODO: throw error?
                return undefined;
            }
            const idx = new jsbn.BigInteger('' + tmp);
            const tmp1 = new jsbn.BigInteger(j.toString());
            tmp1.dMultiply(idx.intValue()); // Modified to meet TS spec: added .intValue()
            answer = answer.add(tmp1);
            j.dMultiply(this.bigRadix.intValue()); // Modified to meet TS spec: added .intValue()
        }

        const ans = answer.toByteArray();
        while (ans[0] === 0) {
            ans.shift();
        }

        for (let i = 0; i < encoded.length; i++) {
            if (encoded.charAt(i) !== this.ALPHABET[0]) {
                break;
            }
            ans.unshift(0);
        }

        return ans;
    }
}
