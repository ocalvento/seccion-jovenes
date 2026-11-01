// Native WPForms import data. No submission data or credentials are included.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const source = JSON.parse(fs.readFileSync(path.join(root,'data/association-form.json'),'utf8'));
const fields = {};
source.questions.forEach((q,index) => {
  const id=String(index+1);
  const type=q.type===1?'textarea':q.type===2?'select':q.label==='Correo electrónico'?'email':'text';
  const field={id,type,label:q.label,description:'',required:'1',size:'large',placeholder:'',default_value:'',css:''};
  if(q.type===9) { field.placeholder='DD/MM/AAAA'; field.input_mask='99/99/9999'; }
  if(type==='email') { field.confirmation_placeholder=''; field.filter_type=''; field.allowlist=''; field.denylist=''; }
  if(type==='select') {
    field.choices=Object.fromEntries(source.paymentOptions.map((label,i)=>[String(i+1),{label,value:'',image:'',icon:''}]));
    field.style='classic'; field.placeholder='Seleccioná una opción';
    field.description=source.feeNotice;
  }
  fields[id]=field;
});
const form={fields,field_id:16,settings:{
  form_title:'Solicitud de ingreso al Comité',
  form_desc:'Completá los 15 campos de la solicitud. El envío no implica la incorporación automática al Comité.',
  submit_text:'Enviar solicitud',submit_text_processing:'Enviando solicitud…',
  antispam:'1',antispam_v3:'1',form_class:'committee-association-native',submit_class:'button',ajax_submit:'1',notification_enable:'1',
  notifications:{'1':{email:'administracion@abogadosdebancos.org.ar',subject:'Nueva solicitud de ingreso al Comité',sender_name:'Comité de Abogados de Bancos',sender_address:'{admin_email}',replyto:'{field_id="10"}',message:'Solicitud enviada desde la web del Comité. Requiere revisión administrativa.\n\n{all_fields}'}},
  confirmations:{'1':{type:'message',message:'Gracias. Tu solicitud fue enviada para su revisión. El envío no implica la incorporación automática al Comité.',message_scroll:'1',page:'',redirect:''}}
},meta:{template:'blank'}};
fs.writeFileSync(path.join(root,'wordpress/solicitud-wpforms.json'),JSON.stringify([form],null,2));
console.log('WPForms import prepared: 15 required fields; no remote changes.');
