/* 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ 商业授权或定制开发请微信添加微信号zhuatech或zhuatech2进行咨询。 */
const config={"slug":"policyai","feature":"policy-control-version-diff","mode":"vue","sample":{"before":[{"id":"C1","owner":"采购部","statement":"按季度复核","reviewDays":90,"mandatory":false},{"id":"OLD","owner":"财务部","statement":"旧要求","reviewDays":30,"mandatory":true}],"after":[{"id":"C1","owner":"采购部","statement":"按月复核","reviewDays":30,"mandatory":true}]}};
/* 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ 商业授权或定制开发请微信添加微信号zhuatech或zhuatech2进行咨询。 */
import {parsePayload,formatValue,columnsFor,cellValue} from './practical-format.js';
const labels={"found":"已找到路径","hopCount":"关系跳数","nodes":"节点","edges":"关系证据","visitedNodes":"已访问节点","automaticWrite":"已自动写入","rowCount":"数据行数","columns":"字段画像","issues":"复核事项","fileParsed":"已解析Excel文件","matches":"匹配结果","zeroVectors":"无效零向量","dimension":"向量维度","embeddingPerformed":"已执行图像特征提取","fitsSingleImage":"单图符合像素上限","batchCapacity":"单批容量","batches":"分批清单","requestedImages":"请求图片数","totalPixels":"总像素数","generationPerformed":"已调用生成模型","scenes":"分镜时间线","totalFrames":"成片总帧数","durationSeconds":"成片时长（秒）","renderPerformed":"已渲染视频","chunks":"分句切片","totalCodePoints":"Unicode码点数","textPreserved":"原文已保留","audioGenerated":"已生成音频","segments":"片段时间线","webvtt":"WebVTT字幕","transcriptionPerformed":"已执行语音识别","state":"状态","selectedIntent":"选定意图","requiresConfirmation":"需要确认","candidates":"候选意图","actionExecuted":"已执行动作","totalDurationMs":"总时长（毫秒）","tooFastSegments":"超速段数","recipients":"收件人预览","duplicateCount":"重复收件人数量","externalCount":"外域收件人数量","attachmentBytes":"附件合计字节","readyForReview":"满足当前检查规则","mailSent":"已发送邮件","earnedPoints":"实得分数","possiblePoints":"总分","scorePercent":"得分（%）","unansweredCount":"未答题数","questions":"评分明细","certificationIssued":"已发证","changes":"版本变更","changeCount":"变更数","reviewRequired":"需要复核","policyPublished":"已发布制度","steps":"步骤关键路径","minimumElapsedMinutes":"理论最短耗时（分钟）","resourceSchedulingPerformed":"已执行资源排班","currency":"币种","totalSpend":"支出总额","sharesDefined":"集中度指标可计算","suppliers":"供应商份额","hhi":"HHI集中度","topNPercent":"前N供应商占比（%）","automaticRiskDecision":"已自动风险决策","matchCount":"匹配数","exceptions":"待复核异常","automaticPosting":"已记账","contracts":"续约日历","requiresReviewCount":"需处理合同数","notificationSent":"已发送提醒","claims":"结论证据覆盖","evidence":"来源时效","gapCount":"证据缺口数","sourceContentFetched":"已抓取来源正文","truthCertified":"已认证真实性","criteria":"评分要点","scoreDefined":"得分可计算","buyerTextSharePercent":"客户文本占比（%）","employeeEvaluationApproved":"已批准员工考核","lines":"订单行核算","netAmount":"不含税金额","grossAmount":"含税金额","totalCost":"成本合计","creditExposure":"信用暴露金额","creditWithinLimit":"未超过信用额度","automaticRelease":"已正式放行","files":"分类结果","fileContentRead":"已读取文件内容","filesMoved":"已移动文件","id":"编号","text":"文稿","type":"类型","column":"字段","valid":"有效数","missing":"缺失数","invalid":"无效数","distinctValid":"有效值去重数","numericDefined":"数值统计可计算","minimum":"最小值","maximum":"最大值","mean":"平均值","similarity":"相似度","batch":"批次","imageCount":"图片数","pixels":"像素数","seeds":"种子清单","startFrame":"开始帧","endFrameExclusive":"结束帧（不含）","durationFrames":"时长帧数","transitionOut":"转场帧数","fromCodePoint":"开始码点","toCodePointExclusive":"结束码点（不含）","codePointCount":"码点数","startMs":"开始（毫秒）","endMs":"结束（毫秒）","speaker":"说话人","caption":"字幕内容","matchCountAlias":"命中数","matchedPhrases":"命中短语","codePointsPerSecond":"每秒码点","tooFast":"超过语速阈值","role":"收件类型","address":"邮箱地址","external":"外域","earned":"实得分","possible":"满分","changedFields":"变更字段","tightened":"要求收紧","before":"变更前","after":"变更后","earliestStartMinutes":"最早开始（分钟）","earliestFinishMinutes":"最早完成（分钟）","slackMinutes":"浮动（分钟）","critical":"关键步骤","supplier":"供应商","amount":"金额","sharePercent":"份额（%）","left":"左侧记录","right":"右侧记录","side":"数据侧","reminderDate":"提醒日期","decisionDeadline":"决策截止日","endDate":"到期日","daysUntilDeadline":"距截止日天数","requiresReview":"需要复核","currentEvidenceCount":"有效证据数","gap":"存在缺口","claim":"结论","url":"来源URL","ageDays":"证据日龄","weight":"权重","covered":"已覆盖","evidenceTurns":"依据话轮","net":"净额","tax":"税额","cost":"成本","stockShortfall":"库存缺口","categories":"分类","matchedRules":"命中规则","extension":"扩展名","executableName":"可执行类型名称"};
const label=key=>labels[key]||key;
const element=id=>document.getElementById(id);
let result=null,controller=null;
const source=element('payload'),error=element('error'),output=element('output'),status=element('status');
source.value=JSON.stringify(config.sample,null,2);
/** 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ 商业授权或定制开发请微信添加微信号zhuatech或zhuatech2进行咨询。 */
function text(tag,value){const node=document.createElement(tag);node.textContent=value;return node;}
/** 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ 商业授权或定制开发请微信添加微信号zhuatech或zhuatech2进行咨询。 */
function display(data){
 output.replaceChildren();const summary=document.createElement('dl');summary.className='summary';
 for(const[key,value]of Object.entries(data)){
  if(Array.isArray(value))continue;
  if(key==='webvtt'){const section=document.createElement('section');section.append(text('h3','WebVTT字幕'));const pre=text('pre',value);section.append(pre);output.append(section);continue;}
  summary.append(text('dt',label(key)),text('dd',formatValue(value)));
 }
 output.prepend(summary);
 for(const[key,rows]of Object.entries(data).filter(([,value])=>Array.isArray(value))){
  const section=document.createElement('section');section.append(text('h3',label(key)+'（'+rows.length+'）'));
  if(rows.length===0)section.append(text('p','无记录'));
  else{
   const preview=rows.slice(0,100),columns=columnsFor(preview),wrap=document.createElement('div'),table=document.createElement('table'),head=document.createElement('thead'),tr=document.createElement('tr');wrap.className='table-scroll';
   for(const column of columns)tr.append(text('th',label(column)));head.append(tr);table.append(head);const body=document.createElement('tbody');
   for(const row of preview){const tr=document.createElement('tr');for(const column of columns)tr.append(text('td',formatValue(cellValue(row,column))));body.append(tr);}
   table.append(body);wrap.append(table);section.append(wrap);
   if(rows.length>100)section.append(text('p','当前预览前100行；导出文件包含完整'+rows.length+'行。'));
  }output.append(section);
 }
 element('export').disabled=false;element('export-vtt').hidden=typeof data.webvtt!=='string';
}
/** 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ 商业授权或定制开发请微信添加微信号zhuatech或zhuatech2进行咨询。 */
function save(value,filename,type){
 const url=URL.createObjectURL(new Blob([value],{type})),link=document.createElement('a');link.href=url;link.download=filename;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}
/** 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ 商业授权或定制开发请微信添加微信号zhuatech或zhuatech2进行咨询。 */
element('request').addEventListener('submit',async event=>{
 event.preventDefault();if(controller)return;
 error.hidden=true;result=null;element('export').disabled=true;element('export-vtt').hidden=true;output.replaceChildren(text('p','正在处理…'));
 try{
  if(location.protocol==='file:')throw Error('请通过HTTP部署访问此页面，直接打开文件不能连接接口');
  parsePayload(source.value);
  const token=config.mode==='vue'?sessionStorage.getItem(config.slug+'-session'):element('token').value;
  if(!token)throw Error(config.mode==='vue'?'登录会话不存在，请返回工作台登录':'请填写服务端配置的专项访问令牌');
  const headers={'Content-Type':'application/json',Authorization:'Bearer '+token};
  controller=new AbortController();element('run').disabled=true;source.disabled=true;status.textContent='正在处理';const timer=setTimeout(()=>controller.abort(),15000);
  let response;try{response=await fetch('/api/practical/'+config.feature,{method:'POST',headers,body:source.value,signal:controller.signal})}finally{clearTimeout(timer);}
  let body;try{body=await response.json()}catch{throw Error('服务未返回JSON，请检查后端或反向代理配置');}
  if(!response.ok||body.success!==true)throw Error(response.status===401?'凭据无效或会话已失效，请检查令牌/重新登录':body.message||'请求失败（'+response.status+'）');
  result=body.data;display(result);status.textContent='计算完成；未变更业务记录';
 }catch(ex){error.textContent=ex.name==='AbortError'?'请求超时，请稍后重试':ex.message;error.hidden=false;status.textContent='未完成';output.replaceChildren(text('p','暂无结果；请更正输入后重试。'));}
 finally{controller=null;element('run').disabled=false;source.disabled=false;}
});
/** 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ 商业授权或定制开发请微信添加微信号zhuatech或zhuatech2进行咨询。 */
element('reset').addEventListener('click',()=>{if(controller)return;source.value=JSON.stringify(config.sample,null,2);error.hidden=true;result=null;element('export').disabled=true;element('export-vtt').hidden=true;output.replaceChildren(text('p','尚未执行，请提交参数。'));status.textContent='等待执行';});
/** 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ 商业授权或定制开发请微信添加微信号zhuatech或zhuatech2进行咨询。 */
element('export').addEventListener('click',()=>{if(result)save(JSON.stringify(result,null,2),config.feature+'-result.json','application/json;charset=utf-8');});
/** 上海如静知华信息科技有限公司 · https://www.zhuatech.cn/ 商业授权或定制开发请微信添加微信号zhuatech或zhuatech2进行咨询。 */
element('export-vtt').addEventListener('click',()=>{if(result?.webvtt)save(result.webvtt,'transcript.vtt','text/vtt;charset=utf-8');});
window.addEventListener('pagehide',()=>controller?.abort());
