import type { PrivacyRule, PrivacyMode, PublicView } from './types'
import type { Translations } from './i18n'

const HIDDEN = 'Hidden'

type RawFields = {
  amount: number
  asset: string
  sender: string
  receiver: string
}

export function applyRules(
  fields: RawFields,
  mode: PrivacyMode,
  rules: PrivacyRule
): PublicView {
  if (mode === 'public') {
    return {
      amount: `${fields.amount} ${fields.asset}`,
      sender: fields.sender,
      receiver: fields.receiver,
    }
  }

  if (mode === 'private') {
    return { amount: HIDDEN, sender: HIDDEN, receiver: HIDDEN }
  }

  const amountHidden =
    rules.hideAmountAbove !== undefined && fields.amount > rules.hideAmountAbove

  return {
    amount: amountHidden ? HIDDEN : `${fields.amount} ${fields.asset}`,
    sender: rules.hideSender ? HIDDEN : fields.sender,
    receiver: rules.hideReceiver ? HIDDEN : fields.receiver,
  }
}

export function describeRules(
  rules: PrivacyRule,
  asset: string = 'USDC',
  t?: Translations
): string[] {
  const lines: string[] = []
  const rd = t?.ruleDesc
  const roleNames = t?.roles

  const roleName = (r: string) =>
    roleNames?.[r as keyof typeof roleNames] ?? r

  if (rules.hideAmountAbove !== undefined) {
    lines.push(rd ? rd.hideAmountAbove(rules.hideAmountAbove, asset) : `Hide amount if > ${rules.hideAmountAbove} ${asset}`)
  }
  if (rules.hideSender) lines.push(rd?.hideSender ?? 'Hide sender address')
  if (rules.hideReceiver) lines.push(rd?.hideReceiver ?? 'Hide receiver address')

  const revealRoles = rules.revealTo.filter((r) => r !== 'public').map(roleName)
  if (revealRoles.length > 0) {
    lines.push(rd ? rd.allowReveal(revealRoles.join(', ')) : `Allow reveal by: ${revealRoles.join(', ')}`)
  }

  if (rules.delayMinutes !== undefined && rules.delayMinutes > 0) {
    lines.push(rd ? rd.delay(rules.delayMinutes) : `Delay disclosure by ${rules.delayMinutes} minutes`)
  }

  return lines
}
