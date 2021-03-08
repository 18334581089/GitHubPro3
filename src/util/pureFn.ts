import LANGUAGE_LIST from "./../pages/language/langs"

export interface ILanguageItem {
  language: string
  title: string
}

export const getLanguageData = (lists:string[]) => {
  return LANGUAGE_LIST.reduce<ILanguageItem[]>((target, { value, label }) => {
    if (lists.includes(value)) {
      target.push({
        title: label,
        language: value
      })
    }
    return target
  }, [])
}

export const getLanguageOptions = (val:string) => {
  return LANGUAGE_LIST.filter(item => item.value.includes(val))
}