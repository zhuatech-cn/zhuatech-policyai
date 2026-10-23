/* 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ 商业授权或定制开发请微信添加微信号zhuatech或zhuatech2进行咨询。 */
import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const source=readFileSync(new URL('../public/practical-format.js',import.meta.url),'utf8');
const {parsePayload,formatValue,columnsFor,cellValue}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
test('parses a real object',()=>assert.deepEqual(parsePayload('{"x":1}'),{x:1}));
test('rejects invalid JSON',()=>assert.throws(()=>parsePayload('{'),/JSON格式错误/));
test('rejects null root',()=>assert.throws(()=>parsePayload('null'),/JSON对象/));
test('rejects array root',()=>assert.throws(()=>parsePayload('[]'),/JSON对象/));
test('rejects primitive root',()=>assert.throws(()=>parsePayload('1'),/JSON对象/));
test('limits actual UTF-8 bytes',()=>assert.throws(()=>parsePayload('{"x":"'+ '中'.repeat(50000)+'"}'),/128 KiB/));
test('represents absent and boolean values',()=>{assert.equal(formatValue(null),'—');assert.equal(formatValue(false),'否');});
test('keeps markup as text data',()=>assert.equal(formatValue('<script>x</script>'),'<script>x</script>'));
test('stable union of table columns',()=>assert.deepEqual(columnsFor([{z:1},{a:2}]),['a','z']));
test('supports primitive result rows',()=>{assert.deepEqual(columnsFor([1,'x']),['value']);assert.equal(cellValue(1,'value'),1);});
