// 你要插入的自定义规则（前置）
const prependRule = [    
    "DOMAIN-SUFFIX,gemini.google.com,PROXY",
    "DOMAIN-SUFFIX,bard.google.com,PROXY",
    "DOMAIN-SUFFIX,aistudio.google.com,PROXY",
    "DOMAIN-SUFFIX,ai.google.dev,PROXY",
    "DOMAIN-SUFFIX,deepmind.com,PROXY",
    "DOMAIN-SUFFIX,deepmind.google.com,PROXY",
    "DOMAIN-SUFFIX,generativelanguage.googleapis.com,PROXY",
    "DOMAIN-SUFFIX,proactivebackend-pa.googleapis.com,PROXY",
    "DOMAIN-SUFFIX,alkalimakersuite-pa.clients6.google.com,PROXY",
    "DOMAIN-SUFFIX,fonts.googleapis.com,PROXY",
    "DOMAIN-SUFFIX,fonts.gstatic.com,PROXY",
    "DOMAIN-SUFFIX,gstatic.com,PROXY",
    "DOMAIN-SUFFIX,www.gstatic.com,PROXY",
    "DOMAIN-SUFFIX,googleusercontent.com,PROXY",
    "DOMAIN-SUFFIX,claude.ai,PROXY",
    "DOMAIN-SUFFIX,anthropic.com,PROXY",
    "DOMAIN-SUFFIX,claudeusercontent.com,PROXY",
    "DOMAIN-SUFFIX,cdn.usefathom.com,PROXY",
    "DOMAIN-SUFFIX,console.anthropic.com,PROXY",
    "DOMAIN-SUFFIX,aicursor.com,PROXY",
    "DOMAIN-SUFFIX,cursor.sh,PROXY",
    "DOMAIN-SUFFIX,openai.com,PROXY",
    "DOMAIN-SUFFIX,intercom.io,PROXY",
    "DOMAIN-SUFFIX,intercomcdn.com,PROXY",
    "DOMAIN-SUFFIX,cursor.so,PROXY"
  ];

// 入口函数（Clash Verge Rev 自动调用）
function main(config,profileName) {
  rules = []
   // profileName == EEVPN 时，将 PROXY 替换为 EEVPN
   // profileName == miaoss 时，将 PROXY 替换为 🐟 漏网之鱼
   if (profileName === "EEVPN") {
    prependRule.forEach((rule) => {
      rule = rule.replace("PROXY", "EEVPN");
      rules.push(rule);
    });
  }
   else if (profileName === "miaoss") {
    prependRule.forEach((rule) => {
      rule = rule.replace("PROXY", "🐟 漏网之鱼");
      rules.push(rule);
    });
  }

    // 获取原 rules
    const oldRules = config.rules || [];

    // 插入到最前
    config.rules = rules.concat(oldRules);

    return config;
}
