export function normalizeForKaTeX(str: string) {
  // 1. 把 \text{\dot{A}} 替换成 \dot{A}
  let replaced = str.replace(/\\text\{\\dot\{([A-Za-z])\}\}/g, '\\dot{$1}')

  // 2. 去除最外层成对的花括号，且确保括号匹配
  while (replaced.startsWith('{') && replaced.endsWith('}')) {
    let count = 0
    let matched = false
    for (let i = 0; i < replaced.length; i++) {
      if (replaced[i] === '{') count++
      else if (replaced[i] === '}') count--
      if (count === 0) {
        matched = i === replaced.length - 1
        break
      }
    }
    if (matched) {
      replaced = replaced.slice(1, -1)
    } else {
      break
    }
  }
  return replaced
}

function removeTextWrap(str: string) {
  return str.replace(/\\text\s*\{\s*(\\dot\{[^{}]+\})\s*\}/g, '$1')
}

export function extractAllBetweenBrackets(str: string) {
  const regex = /\\\[(.*?)\\\]/gs // g 全局，s 点号匹配换行
  const results = []
  let match
  while ((match = regex.exec(str)) !== null) {
    results.push(match[1])
  }
  return removeTextWrap(results.join('')) // 返回所有匹配的内容连接成一个字符串
}
