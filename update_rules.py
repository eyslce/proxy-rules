#!/usr/bin/env python3
"""
读取 clash.yaml 文件中的规则，并更新 clash-verge-rev.js 中的 prependRule 数组
"""

import re
from pathlib import Path


def read_clash_rules(yaml_path: Path) -> list[str]:
    """读取 clash.yaml 文件，提取规则行"""
    rules = []

    with open(yaml_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            # 跳过空行和注释行
            if not line or line.startswith("#"):
                continue
            # 提取以 - 开头的规则行
            if line.startswith("-"):
                # 移除开头的 - 和空格
                rule = line[1:].strip()
                if rule:
                    rules.append(rule)

    return rules


def update_js_file(js_path: Path, rules: list[str]) -> None:
    """更新 clash-verge-rev.js 文件中的 prependRule 数组"""
    with open(js_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 构建新的 prependRule 数组内容
    if not rules:
        rules_content = "    \n  "
    else:
        # 将规则转换为 JavaScript 字符串数组格式
        # 转义规则中的双引号
        escaped_rules = [rule.replace('"', '\\"') for rule in rules]
        rules_lines = [f'    "{rule}",' for rule in escaped_rules]
        # 移除最后一个逗号
        if rules_lines:
            rules_lines[-1] = rules_lines[-1].rstrip(",")
        rules_content = "\n".join(rules_lines) + "\n  "

    # 使用正则表达式替换 prependRule 数组内容
    # 匹配 prependRule = [ ... ]; 之间的内容（包括换行和空格）
    pattern = r"(const prependRule = \[)([\s\S]*?)(\];)"

    def replace_func(match):
        return f"{match.group(1)}{rules_content}{match.group(3)}"

    new_content = re.sub(pattern, replace_func, content)

    if new_content == content:
        raise ValueError("未能找到 prependRule 数组，请检查文件格式")

    with open(js_path, "w", encoding="utf-8") as f:
        f.write(new_content)


def main():
    """主函数"""
    project_root = Path(__file__).parent
    yaml_path = project_root / "clash.yaml"
    js_path = project_root / "clash-verge-rev.js"

    # 读取规则
    print(f"正在读取 {yaml_path}...")
    rules = read_clash_rules(yaml_path)
    print(f"找到 {len(rules)} 条规则")

    # 更新 JS 文件
    print(f"正在更新 {js_path}...")
    update_js_file(js_path, rules)
    print("更新完成！")


if __name__ == "__main__":
    main()
