import assert from 'node:assert/strict';
import { languageCookie, preferredDestination, readLocale } from '../lib/locale.ts';

// The default must remain English, including invalid/stale preference cookies.
for (const cookie of ['', 'midnight_language=de', 'midnight_language=%65l', 'other=el']) {
  assert.equal(readLocale(cookie),null);
  assert.equal(preferredDestination('/',cookie),null);
}
assert.equal(readLocale('other=1; midnight_language=el; other2=2'),'el');
assert.equal(preferredDestination('/','midnight_language=el','#showreel'),'/el/#showreel');
assert.equal(preferredDestination('/','midnight_language=en'),null);
assert.equal(preferredDestination('/el/','midnight_language=en'),null,'Explicit Greek route must remain accessible');
assert.equal(preferredDestination('/404.html','midnight_language=el'),null,'Only the homepage restores the preference');
assert.equal(preferredDestination('/','midnight_language=//evil.example'),null);
assert(languageCookie('el',true).endsWith('; Secure'));
assert(!languageCookie('el',false).includes('Secure'));
assert(languageCookie('en',false).includes('Max-Age=31536000; SameSite=Lax'));
assert(languageCookie(null,true).includes('midnight_language=; Path=/; Max-Age=0'));
console.log('PASS: English default, explicit language routes, saved Greek choice, section preservation, invalid cookies, secure cookie and deletion.');
