const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const fs=require('node:fs');
const path=require('node:path');
const states=[['start','01-start'],['standard','02-standard'],['result','03-result'],['save','04-save'],['folder','05-folder'],['deferred','06-deferred'],['saved','07-saved'],['clean','08-clean'],['clean-folder','09-clean-folder'],['clean-deferred','10-clean-deferred'],['clean-saved','11-clean-saved']];
(async()=>{
  const browser=await chromium.launch();
  const page=await browser.newPage({viewport:{width:1728,height:1100},deviceScaleFactor:1});
  try{
    let serving=false;
    for(let attempt=0;attempt<50;attempt++){try{if((await fetch('http://127.0.0.1:4410/')).ok){serving=true;break;}}catch{}await new Promise(resolve=>setTimeout(resolve,200));}
    if(!serving)throw new Error('Preview server did not start');
    const target=path.resolve('public/scenario-map/screens');fs.mkdirSync(target,{recursive:true});
    for(const [id,file]of states){
      await page.goto('http://127.0.0.1:4410/?atlas=vnd-to-be.'+id+'&embed=1');
      await page.getByText('Здравствуйте! Я помогу проверить ваш ВНД',{exact:false}).waitFor();
      if(id.endsWith('folder'))await page.getByRole('dialog',{name:'Папка для актуального ВНД'}).waitFor();
      await page.evaluate(()=>document.fonts.ready);
      await page.screenshot({path:path.join(target,'vnd-to-be-'+file+'.png'),animations:'disabled'});
    }
    console.log('Refreshed all 11 VND TO-BE screen states.');
  }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
