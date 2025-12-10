# Proxy Rules

一个用于管理代理规则的Python工具，可以将Clash YAML配置文件中的代理规则自动同步到Clash Verge Rev的JavaScript配置文件中。

## 🌟 功能特性

- **自动规则同步**: 从 `clash.yaml` 文件中读取代理规则，自动更新到 `clash-verge-rev.js` 文件
- **智能规则解析**: 支持解析YAML格式的代理规则，自动过滤空行和注释
- **JavaScript格式转换**: 将YAML规则转换为JavaScript数组格式，支持特殊字符转义
- **配置文件支持**: 预置了Gemini、Claude、Cursor等AI服务的代理规则
- **多配置文件适配**: 支持根据不同的配置文件名称（如EEVPN、miaoss）动态替换代理组名称

## 📋 项目结构

```
proxy-rules/
├── clash.yaml              # Clash代理规则配置文件
├── clash-verge-rev.js      # Clash Verge Rev脚本文件
├── update_rules.py         # 规则同步主程序
├── pyproject.toml          # Python项目配置文件
├── OmegaOptions.json       # Omega选项配置
└── README.md              # 项目说明文档
```

## 🚀 快速开始

### 1. 环境要求

- Python 3.10+
- PDM（Python包管理器）

### 2. 安装依赖

```bash
# 使用PDM安装项目依赖
pdm install
```

### 3. 运行规则同步

```bash
# 执行规则同步脚本
python update_rules.py
```

或者使用PDM：

```bash
pdm run python update_rules.py
```

## 📖 使用说明

### 编辑代理规则

1. 打开 `clash.yaml` 文件
2. 按照YAML格式添加或修改代理规则
3. 每条规则格式为：`- DOMAIN-SUFFIX,域名,代理组`
4. 支持添加注释（以 `#` 开头）

示例规则：
```yaml
# Gemini AI服务规则
- DOMAIN-SUFFIX,gemini.google.com,PROXY
- DOMAIN-SUFFIX,generativelanguage.googleapis.com,PROXY

# Claude AI服务规则
- DOMAIN-SUFFIX,claude.ai,PROXY
- DOMAIN-SUFFIX,anthropic.com,PROXY
```

### 同步规则

运行 `update_rules.py` 脚本后，程序会：
1. 读取 `clash.yaml` 中的所有规则
2. 过滤空行和注释
3. 将规则转换为JavaScript数组格式
4. 更新 `clash-verge-rev.js` 文件中的 `prependRule` 数组

### 在Clash Verge Rev中使用

将生成的 `clash-verge-rev.js` 文件导入到Clash Verge Rev中作为脚本使用，程序会根据不同的配置文件名称自动调整代理组：

- 当 `profileName === "EEVPN"` 时，将 `PROXY` 替换为 `EEVPN`
- 当 `profileName === "miaoss"` 时，将 `PROXY` 替换为 `🐟 漏网之鱼`

## ⚙️ 配置文件说明

### clash.yaml

包含所有代理规则的YAML格式配置文件，支持以下规则类型：
- `DOMAIN-SUFFIX`：域名后缀匹配
- `DOMAIN`：完整域名匹配
- `IP-CIDR`：IP地址段匹配
- `GEOIP`：地理位置匹配
- `MATCH`：通用匹配

### clash-verge-rev.js

Clash Verge Rev的脚本文件，包含：
- `prependRule` 数组：存储所有前置规则
- `main()` 函数：Clash Verge Rev自动调用的入口函数
- 动态代理组替换逻辑

## 🔧 开发说明

### 主要函数

- `read_clash_rules(yaml_path)`: 读取YAML文件中的规则
- `update_js_file(js_path, rules)`: 更新JavaScript文件中的规则数组
- `main()`: 主函数，协调整个同步流程

### 错误处理

程序包含完善的错误处理机制：
- 文件不存在时抛出清晰的错误信息
- 规则格式错误时提供详细的错误描述
- JavaScript数组更新失败时给出具体的失败原因

## 📄 许可证

本项目基于 [MIT License](LICENSE) 开源协议。

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

### 提交Issue
- 报告Bug时请提供详细的错误信息和复现步骤
- 建议新功能时请说明具体的使用场景

### 提交Pull Request
- 确保代码通过了所有测试
- 更新相关的文档
- 遵循项目的代码风格

## 📞 联系方式

如有问题或建议，欢迎通过以下方式联系：
- 提交GitHub Issue
- 发送邮件至项目维护者

---

**注意**: 本项目仅供学习和研究使用，请遵守当地的法律法规。