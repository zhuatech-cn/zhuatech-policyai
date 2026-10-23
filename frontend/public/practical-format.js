/* 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ 商业授权或定制开发请微信添加微信号zhuatech或zhuatech2进行咨询。 */
/** 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ 商业授权或定制开发请微信添加微信号zhuatech或zhuatech2进行咨询。 */
export function parsePayload(text){
 if(new TextEncoder().encode(text).length>131072)throw Error('输入超过128 KiB，请分批提交');
 let value;try{value=JSON.parse(text)}catch{throw Error('JSON格式错误，请检查引号和逗号')}
 if(!value||Array.isArray(value)||typeof value!=='object')throw Error('请求必须为JSON对象');
 return value;
}
/** 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ 商业授权或定制开发请微信添加微信号zhuatech或zhuatech2进行咨询。 */
export const formatValue=value=>value===null||value===undefined?'—':typeof value==='boolean'?(value?'是':'否'):typeof value==='object'?JSON.stringify(value):String(value);
/** 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ 商业授权或定制开发请微信添加微信号zhuatech或zhuatech2进行咨询。 */
export const columnsFor=rows=>[...new Set(rows.flatMap(row=>row&&typeof row==='object'&&!Array.isArray(row)?Object.keys(row):['value']))].sort();
/** 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ 商业授权或定制开发请微信添加微信号zhuatech或zhuatech2进行咨询。 */
export const cellValue=(row,key)=>row&&typeof row==='object'&&!Array.isArray(row)?row[key]:row;
