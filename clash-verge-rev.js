// 你要插入的自定义规则（前置）
const prependRule = [
    "DOMAIN-SUFFIX,gemini.google.com,🐟 漏网之鱼",
    "DOMAIN-SUFFIX,bard.google.com,🐟 漏网之鱼",
    "DOMAIN-SUFFIX,aistudio.google.com,🐟 漏网之鱼",
    "DOMAIN-SUFFIX,ai.google.dev,🐟 漏网之鱼",
    "DOMAIN-SUFFIX,deepmind.com,🐟 漏网之鱼",
    "DOMAIN-SUFFIX,deepmind.google.com,🐟 漏网之鱼",
    "DOMAIN-SUFFIX,generativelanguage.googleapis.com,🐟 漏网之鱼",
    "DOMAIN-SUFFIX,proactivebackend-pa.googleapis.com,🐟 漏网之鱼",
    "DOMAIN-SUFFIX,alkalimakersuite-pa.clients6.google.com,🐟 漏网之鱼",
    "DOMAIN-SUFFIX,fonts.googleapis.com,🐟 漏网之鱼",
    "DOMAIN-SUFFIX,fonts.gstatic.com,🐟 漏网之鱼",
    "DOMAIN-SUFFIX,gstatic.com,🐟 漏网之鱼",
    "DOMAIN-SUFFIX,www.gstatic.com,🐟 漏网之鱼",
    "DOMAIN-SUFFIX,googleusercontent.com,🐟 漏网之鱼"
  ];

// 入口函数（Clash Verge Rev 自动调用）
function main(config,profileName) {
    // 获取原 rules
    const oldRules = config.rules || [];

    // 插入到最前
    config.rules = prependRule.concat(oldRules);

    return config;
}
