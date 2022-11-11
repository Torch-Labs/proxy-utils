const testStr = 'basic.killerproxies.com:31112:ps_ct0zl9la1yimvu3eazh1:9G3TgUexB87KE0xh_country-Armenia';
const re = /basic.killerproxies.com:31112:ps_ct0zl9la1yimvu3eazh1:.{16}_country-Armenia/g;

console.log(re.test(testStr));
