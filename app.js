const API_URL = 'https://codex-reset.com/api/timeline';
const REFRESH_INTERVAL = 60_000;
const EVENT_LIMIT = 14;
const messages = {
  en: {
    pageTitle: 'TIBO / RADAR — Reset intelligence', refresh: 'Refresh', refreshLabel: 'Refresh timeline data', languageLabel: 'Language selector', filterLabel: 'Filter timeline', heroImageAlt: 'Tibo pressing a large glowing red RESET button', viewEvent: 'View event', connecting: 'Connecting to source', sourceConnected: 'Live source connected', cachedRecord: 'Showing cached radar record',
    heroEyebrow: 'Independent reset monitor', heroTitle: '<span>When Tibo hits it,</span><em>we catch it.</em>', heroCopy: 'The live record of Codex resets, banked credits, and the signals that arrive just before the button moves.', feedUpdated: 'Feed updated', openSource: 'Open source', latestVerified: 'Latest verified reset', elapsed: 'Elapsed', radarLive: 'Radar live', enterRadar: 'Enter radar',
    latestVerifiedHard: 'Latest verified hard reset', verified: 'VERIFIED', since: 'since', verifiedShort: 'Verified', bankedShort: 'Banked', resetCalendar: 'Reset calendar', nextExpected: 'Next expected', calendarLegend: 'Calendar legend', calendarLabel: 'Reset history calendar', weekdaySun: 'S', weekdayMon: 'M', weekdayTue: 'T', weekdayWed: 'W', weekdayThu: 'T', weekdayFri: 'F', weekdaySat: 'S', resetPulse: 'Reset pulse', last90Days: 'Last 90 days', hardResets: 'hard resets', medianGap: 'median gap', today: 'Today', signalBoard: 'Signal board', allTime: 'All time', resetEvent: 'Reset event', bankedCredit: 'Banked credit', previewWindow: 'Preview / window',
    liveTimeline: 'Live timeline', timelineTitle: 'The reset record.', filterAll: 'All', filterHard: 'Hard resets', filterBanked: 'Banked', filterSignals: 'Signals', cadence: 'Cadence', tracked: 'tracked', readingRadar: 'Reading the radar', methodology: '<b>Green</b> marks verified hard resets. <b>Blue</b> marks banked reset credits. Other items are context signals, not a promise of a reset.',
    footerLeft: 'Built for people watching their limits.', footerRight: 'Not affiliated with OpenAI.', loading: 'Loading the radar feed…', sourceEvents: '{count} source events in the current timeline.', cadenceDetail: 'Median interval across {count} verified reset-to-reset gaps.', cadenceNeedEvents: 'More verified events are needed to calculate cadence.', nextEstimate: 'History-based estimate · {gap}-day median cadence · not scheduled', noEstimate: 'More verified history is needed for an estimate', noResetsInRange: 'No verified resets in this range', events90: '{count} events / 90d',
    allPaidAccounts: 'All paid Codex & Work accounts', globalSignal: 'Global signal', trackedSignal: 'Tracked signal', eventReset: 'Reset', eventHard: 'Verified hard reset', eventBanked: 'Banked reset credit', eventPreview: 'Reset window / preview', eventSignal: 'Timeline signal', confidenceHigh: 'high', confidenceMedium: 'medium', confidenceLow: 'low', confidenceTracked: 'tracked', confidence: 'confidence', signal: 'signal', source: 'View source', sourceLive: 'Live radar feed', sourceArchive: 'Verified archive', openSourceFor: 'Open source for {title}', noEvents: 'No events in this view yet.<br />Try another timeline filter.',
    tagLaunch: 'Launch', tagBanked: 'Banked', tagCompensation: 'Compensation', tagMilestone: 'Milestone', tagPromo: 'Promo', tagIncident: 'Incident', offlineSample: 'offline sample', unavailableDate: 'Date unavailable'
  },
  zh: {
    pageTitle: 'TIBO / RADAR — 重置雷达', refresh: '刷新', refreshLabel: '刷新时间线数据', languageLabel: '语言切换', filterLabel: '筛选时间线', heroImageAlt: 'Tibo 按下巨大发光红色 RESET 按钮', viewEvent: '查看事件', connecting: '正在连接数据源', sourceConnected: '实时数据源已连接', cachedRecord: '正在显示缓存雷达记录',
    heroEyebrow: '独立重置监控', heroTitle: '<span>Tibo 按下之后，</span><em>我们立刻捕捉。</em>', heroCopy: '实时记录 Codex 重置、已存储额度，以及按钮落下之前抵达的每一条信号。', feedUpdated: '数据更新于', openSource: '查看来源', latestVerified: '最近已验证重置', elapsed: '已过去', radarLive: '雷达在线', enterRadar: '进入雷达',
    latestVerifiedHard: '最近已验证硬重置', verified: '已验证', since: '前', verifiedShort: '已验证', bankedShort: '存储额度', resetCalendar: '重置日历', nextExpected: '下次预计', calendarLegend: '日历图例', calendarLabel: '历史重置日历', weekdaySun: '日', weekdayMon: '一', weekdayTue: '二', weekdayWed: '三', weekdayThu: '四', weekdayFri: '五', weekdaySat: '六', resetPulse: '重置脉冲', last90Days: '近 90 天', hardResets: '硬重置', medianGap: '中位间隔', today: '今天', signalBoard: '信号面板', allTime: '全部记录', resetEvent: '重置事件', bankedCredit: '存储额度', previewWindow: '预告 / 窗口',
    liveTimeline: '实时时间线', timelineTitle: '重置记录。', filterAll: '全部', filterHard: '硬重置', filterBanked: '存储额度', filterSignals: '信号', cadence: '重置节奏', tracked: '已追踪', readingRadar: '如何阅读雷达', methodology: '<b>绿色</b>表示已验证的硬重置。<b>蓝色</b>表示已存储的重置额度。其他项目是上下文信号，不代表重置承诺。',
    footerLeft: '为关注使用额度的人而建。', footerRight: '与 OpenAI 无关联。', loading: '正在加载雷达数据…', sourceEvents: '当前时间线共有 {count} 条来源事件。', cadenceDetail: '基于 {count} 个已验证重置间隔计算的中位值。', cadenceNeedEvents: '需要更多已验证事件才能计算重置节奏。', nextEstimate: '基于历史中位节奏估算 · {gap} 天 · 非官方排期', noEstimate: '需要更多已验证历史才能推导预计时间', noResetsInRange: '这个时间范围内没有已验证的重置', events90: '近 90 天 {count} 个事件',
    allPaidAccounts: '所有付费 Codex 与 Work 帐号', globalSignal: '全局信号', trackedSignal: '追踪信号', eventReset: '重置信号', eventHard: '已验证硬重置', eventBanked: '已存储重置额度', eventPreview: '重置窗口 / 预告', eventSignal: '时间线信号', confidenceHigh: '高', confidenceMedium: '中', confidenceLow: '低', confidenceTracked: '追踪', confidence: '置信度', signal: '信号', source: '查看来源', sourceLive: '实时雷达信号', sourceArchive: '已验证档案', openSourceFor: '打开“{title}”来源', noEvents: '当前视图没有事件。<br />请尝试其他时间线筛选。',
    tagLaunch: '发布', tagBanked: '存储额度', tagCompensation: '补偿', tagMilestone: '里程碑', tagPromo: '活动', tagIncident: '故障', offlineSample: '离线样例', unavailableDate: '日期不可用'
  }
};

const fallbackData = {
  updated_at: '2026-09-28T16:42:26.469Z',
  stats: { reset: 41, credits: 10, preview: 9 },
  events: [
    { id: '2103911959544610829', date: '2026-09-26', type: 'reset', group: 'reset', reset_kind: 'hard', summary: 'Reset for every paid Codex and ChatGPT Work user, confirmed fully propagated that evening.', announced_at: '2026-09-26T18:17:54.000Z', confidence: 'high', scope: 'global', audience: ['codex', 'chatgpt_work'], source_label: 'Verified archive', url: 'https://x.com/thsottiaux/status/2103911959544610829' },
    { id: '2102463847714247142', date: '2026-09-22', type: 'credits', group: 'credits', reset_kind: 'banked', summary: 'GPT-6 Sol and Luna launch: one banked reset loaded into every Plus, Pro and Business account.', announced_at: '2026-09-22T18:23:37.000Z', confidence: 'high', scope: 'global', audience: [], source_label: 'Verified archive', url: 'https://x.com/thsottiaux/status/2102463847714247142' },
    { id: '2098685367058612394', date: '2026-09-12', type: 'reset', group: 'reset', reset_kind: 'hard', summary: 'Reset for every paid Codex and ChatGPT Work user, confirmed fully propagated.', announced_at: '2026-09-12T08:09:17.000Z', confidence: 'high', scope: 'global', audience: ['codex', 'chatgpt_work'], source_label: 'Verified archive', url: 'https://x.com/thsottiaux/status/2098685367058612394' },
    { id: '2097043464538264003', date: '2026-09-08', type: 'reset', group: 'reset', reset_kind: 'hard', summary: 'Global reset landed in usage meters; Tibo later confirmed it for everyone.', announced_at: '2026-09-08T01:34:00.000Z', confidence: 'high', scope: 'global', audience: ['codex', 'chatgpt_work'], source_label: 'Verified archive', url: 'https://x.com/thsottiaux/status/2097043464538264003' },
    { id: '2095979536043401428', date: '2026-09-04', type: 'credits', group: 'credits', reset_kind: 'banked', summary: 'A banked reset for paid users still without Astra, landing by end of day.', announced_at: '2026-09-04T20:57:17.000Z', confidence: 'high', scope: 'global', audience: [], source_label: 'Verified archive', url: 'https://x.com/thsottiaux/status/2095979536043401428' },
  ],
};

const preferredLanguage = (() => {
  try { return localStorage.getItem('tibo-radar-language') || (navigator.language.startsWith('zh') ? 'zh' : 'en'); } catch { return 'en'; }
})();
const state = { data: fallbackData, filter: 'all', isLive: false, latestReset: null, language: preferredLanguage === 'zh' ? 'zh' : 'en' };
const $ = (selector) => document.querySelector(selector);
const selectors = {
  connection: $('#connection-label'),
  topbarStatus: $('.topbar-status'),
  refresh: $('#refresh-button'),
  updated: $('#feed-updated'),
  latestDate: $('#latest-date'),
  latestSubline: $('#latest-subline'),
  latestConfidence: $('#latest-confidence'),
  latestScope: $('#latest-scope'),
  latestLink: $('#latest-link'),
  heroLatestDate: $('#hero-latest-date'),
  heroLatestAge: $('#hero-latest-age'),
  ageValue: $('#age-value'),
  ageRing: $('#age-ring'),
  hardResetCount: $('#hard-reset-count'),
  medianGap: $('#median-gap'),
  stats: { reset: $('#stat-reset'), credits: $('#stat-credits'), preview: $('#stat-preview') },
  signalFootnote: $('#signal-footnote'),
  sparkline: $('#sparkline'),
  sparkStart: $('#spark-start'),
  cadence: $('#cadence-number'),
  cadenceDetail: $('#cadence-detail'),
  calendar: $('#reset-calendar'),
  calendarMonth: $('#calendar-month'),
  nextExpectedDate: $('#next-expected-date'),
  nextExpectedDetail: $('#next-expected-detail'),
  eventList: $('#event-list'),
  eventTemplate: $('#event-template'),
};

function t(key, values = {}) {
  const template = messages[state.language][key] ?? messages.en[key] ?? key;
  return template.replace(/\{(\w+)\}/g, (_, token) => values[token] ?? `{${token}}`);
}

function currentLocale() {
  return state.language === 'zh' ? 'zh-CN' : 'en-US';
}

function applyTranslations() {
  document.documentElement.lang = state.language === 'zh' ? 'zh-CN' : 'en';
  document.title = t('pageTitle');
  document.querySelectorAll('[data-i18n]').forEach((element) => { element.textContent = t(element.dataset.i18n); });
  document.querySelectorAll('[data-i18n-html]').forEach((element) => { element.innerHTML = t(element.dataset.i18nHtml); });
  document.querySelectorAll('[data-i18n-alt]').forEach((element) => { element.alt = t(element.dataset.i18nAlt); });
  selectors.refresh.setAttribute('aria-label', t('refreshLabel'));
  $('.language-toggle').setAttribute('aria-label', t('languageLabel'));
  $('.filter-tabs').setAttribute('aria-label', t('filterLabel'));
  selectors.calendar.setAttribute('aria-label', t('calendarLabel'));
  $('.calendar-legend').setAttribute('aria-label', t('calendarLegend'));
  document.querySelectorAll('.language-option').forEach((button) => {
    const active = button.dataset.language === state.language;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function parseDate(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function titleCase(value = '') {
  return value.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function fullDate(value) {
  const date = parseDate(value);
  if (!date) return t('unavailableDate');
  return new Intl.DateTimeFormat(currentLocale(), { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

function compactDate(value) {
  const date = parseDate(value);
  if (!date) return '—';
  return new Intl.DateTimeFormat(currentLocale(), { month: 'short', day: 'numeric' }).format(date);
}

function detailedEventTime(value) {
  const date = parseDate(value);
  if (!date) return t('unavailableDate');
  return new Intl.DateTimeFormat(currentLocale(), {
    month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: state.language !== 'zh'
  }).format(date);
}

function relativeTime(value) {
  const date = parseDate(value);
  if (!date) return '—';
  const seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  const units = [[86400, 'day'], [3600, 'hour'], [60, 'min']];
  for (const [span, label] of units) {
    if (seconds >= span) {
      const amount = Math.floor(seconds / span);
      if (state.language === 'zh') return `${amount}${label === 'day' ? '天' : label === 'hour' ? '小时' : '分钟'}`;
      return `${amount}${label === 'day' ? 'd' : label === 'hour' ? 'h' : 'm'}`;
    }
  }
  return state.language === 'zh' ? '刚刚' : 'now';
}

function timeAgo(value) {
  const relative = relativeTime(value);
  if (state.language === 'zh') return relative === '刚刚' ? relative : `${relative}前`;
  return relative === 'now' ? 'just now' : `${relative} ago`;
}

function eventTime(event) {
  return event.effective_at || event.announced_at || event.date;
}

function isHardReset(event) {
  return event.group === 'reset' && (event.reset_kind === 'hard' || event.confidence === 'high') && !event.preview;
}

function isBanked(event) {
  return event.reset_kind === 'banked' || event.group === 'credits';
}

function eventTone(event) {
  if (isHardReset(event)) return 'hard';
  if (isBanked(event)) return 'banked';
  return 'signal';
}

function getHardResets() {
  return state.data.events.filter(isHardReset).sort((a, b) => parseDate(eventTime(b)) - parseDate(eventTime(a)));
}

function median(values) {
  if (!values.length) return null;
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

function resetGaps(resets) {
  return resets.slice(0, -1).map((event, index) => {
    const current = parseDate(eventTime(event));
    const previous = parseDate(eventTime(resets[index + 1]));
    return (current - previous) / 86_400_000;
  }).filter((gap) => Number.isFinite(gap) && gap >= 0);
}

function describeAudience(event) {
  if (event.scope === 'global' && event.audience?.length) return t('allPaidAccounts');
  if (event.scope === 'global') return t('globalSignal');
  if (event.audience?.length) return event.audience.map((audience) => audience === 'chatgpt_work' ? 'ChatGPT Work' : titleCase(audience)).join(' · ');
  return event.scope ? titleCase(event.scope) : t('trackedSignal');
}

function safeUrl(url) {
  try {
    const parsed = new URL(url);
    return ['https:', 'http:'].includes(parsed.protocol) ? parsed.href : '#feed';
  } catch { return '#feed'; }
}

function setFeedStatus(isLive, noteKey) {
  selectors.topbarStatus.classList.toggle('is-stale', !isLive);
  selectors.connection.textContent = t(noteKey);
}

function confidenceText(value) {
  return t(`confidence${titleCase(value || 'tracked').replaceAll(' ', '')}`);
}

function reasonTagText(tag) {
  const key = `tag${titleCase(tag)}`;
  const translation = t(key);
  return translation === key ? titleCase(tag) : translation;
}

function renderCalendar(resets) {
  const feedDate = parseDate(state.data.updated_at) || parseDate(eventTime(resets[0])) || new Date();
  const monthStart = new Date(feedDate.getFullYear(), feedDate.getMonth(), 1);
  const monthEnd = new Date(feedDate.getFullYear(), feedDate.getMonth() + 1, 0);
  const dayEvents = new Map();

  state.data.events.forEach((event) => {
    const date = parseDate(eventTime(event));
    if (!date || date.getFullYear() !== monthStart.getFullYear() || date.getMonth() !== monthStart.getMonth()) return;
    const existing = dayEvents.get(date.getDate()) || { hard: false, banked: false };
    existing.hard ||= isHardReset(event);
    existing.banked ||= isBanked(event);
    dayEvents.set(date.getDate(), existing);
  });

  selectors.calendarMonth.textContent = new Intl.DateTimeFormat(currentLocale(), { month: 'long', year: 'numeric' }).format(monthStart);
  selectors.calendar.textContent = '';
  const fragment = document.createDocumentFragment();
  const today = new Date();
  const leadingEmpty = monthStart.getDay();
  const totalCells = Math.ceil((leadingEmpty + monthEnd.getDate()) / 7) * 7;

  for (let position = 0; position < totalCells; position += 1) {
    const day = position - leadingEmpty + 1;
    const cell = document.createElement('span');
    cell.className = 'calendar-day';
    if (day < 1 || day > monthEnd.getDate()) {
      cell.classList.add('is-empty');
      cell.setAttribute('aria-hidden', 'true');
    } else {
      const date = new Date(monthStart.getFullYear(), monthStart.getMonth(), day);
      const record = dayEvents.get(day);
      cell.textContent = day;
      cell.setAttribute('role', 'gridcell');
      if (record?.hard) cell.classList.add('is-reset');
      else if (record?.banked) cell.classList.add('is-banked');
      if (date.toDateString() === today.toDateString()) cell.classList.add('is-today');
      const eventDescription = record?.hard ? t('eventHard') : record?.banked ? t('eventBanked') : '';
      cell.setAttribute('aria-label', `${new Intl.DateTimeFormat(currentLocale(), { month: 'short', day: 'numeric' }).format(date)}${eventDescription ? ` · ${eventDescription}` : ''}`);
    }
    fragment.append(cell);
  }
  selectors.calendar.append(fragment);

  const gaps = resetGaps(resets);
  const cadence = median(gaps);
  const latest = resets[0];
  if (!latest || !cadence) {
    selectors.nextExpectedDate.textContent = '—';
    selectors.nextExpectedDetail.textContent = t('noEstimate');
    return;
  }
  const estimate = new Date(parseDate(eventTime(latest)).getTime() + cadence * 86_400_000);
  selectors.nextExpectedDate.textContent = new Intl.DateTimeFormat(currentLocale(), { month: 'short', day: 'numeric' }).format(estimate);
  selectors.nextExpectedDetail.textContent = t('nextEstimate', { gap: cadence.toFixed(1) });
}

function renderOverview() {
  const { stats = {} } = state.data;
  const resets = getHardResets();
  const latest = resets[0] || state.data.events.find((event) => event.group === 'reset');
  state.latestReset = latest || null;
  const gaps = resetGaps(resets);
  const recentResets = resets.filter((event) => (Date.now() - parseDate(eventTime(event)).getTime()) < 90 * 86_400_000);
  const last90Median = median(resetGaps(recentResets));

  selectors.updated.dateTime = state.data.updated_at || '';
  selectors.updated.textContent = state.data.updated_at ? timeAgo(state.data.updated_at) : t('offlineSample');
  selectors.stats.reset.textContent = stats.reset ?? resets.length ?? '—';
  selectors.stats.credits.textContent = stats.credits ?? state.data.events.filter(isBanked).length ?? '—';
  selectors.stats.preview.textContent = stats.preview ?? state.data.events.filter((event) => event.preview).length ?? '—';
  selectors.hardResetCount.textContent = recentResets.length || '0';
  const dayUnit = state.language === 'zh' ? '天' : 'd';
  selectors.medianGap.textContent = last90Median ? `${last90Median.toFixed(1)}${dayUnit}` : gaps.length ? `${median(gaps).toFixed(1)}${dayUnit}` : '—';
  selectors.signalFootnote.textContent = t('sourceEvents', { count: state.data.events.length });
  selectors.cadence.textContent = gaps.length ? `${median(gaps).toFixed(1)}${dayUnit}` : '—';
  selectors.cadenceDetail.textContent = gaps.length ? t('cadenceDetail', { count: gaps.length }) : t('cadenceNeedEvents');

  if (!latest) return;
  selectors.latestDate.textContent = fullDate(eventTime(latest));
  selectors.heroLatestDate.textContent = compactDate(eventTime(latest));
  selectors.latestSubline.textContent = latest.summary || t('eventSignal');
  selectors.latestConfidence.textContent = latest.confidence === 'high' ? t('verified') : `${confidenceText(latest.confidence)} ${t('signal')}`;
  selectors.latestScope.textContent = describeAudience(latest);
  selectors.latestLink.href = latest.url ? safeUrl(latest.url) : '#feed';
  selectors.latestLink.setAttribute('aria-label', t('viewEvent'));
  renderAge();
  renderSparkline(resets);
  renderCalendar(resets);
}

function renderAge() {
  const latest = state.latestReset;
  if (!latest) return;
  const date = parseDate(eventTime(latest));
  const days = Math.max(0, (Date.now() - date.getTime()) / 86_400_000);
  const elapsed = days < 1 ? `${Math.max(1, Math.floor(days * 24))}${state.language === 'zh' ? '小时' : 'h'}` : `${Math.floor(days)}${state.language === 'zh' ? '天' : 'd'}`;
  selectors.ageValue.textContent = elapsed;
  selectors.heroLatestAge.textContent = state.language === 'zh' ? `${elapsed}前` : `${elapsed} ago`;
  const normalized = Math.min(91, Math.max(9, days / 14 * 100));
  selectors.ageRing.style.strokeDasharray = `${normalized} 100`;
}

function renderSparkline(resets) {
  const svg = selectors.sparkline;
  const width = 640;
  const height = 124;
  const now = Date.now();
  const start = now - 90 * 86_400_000;
  const inRange = resets.filter((event) => parseDate(eventTime(event)).getTime() >= start).sort((a, b) => parseDate(eventTime(a)) - parseDate(eventTime(b)));
  selectors.sparkStart.textContent = t('events90', { count: inRange.length });
  if (!inRange.length) {
    svg.innerHTML = `<text class="spark-empty" x="320" y="66">${t('noResetsInRange')}</text>`;
    return;
  }
  const positions = inRange.map((event, index) => {
    const time = parseDate(eventTime(event)).getTime();
    const x = 15 + ((time - start) / (now - start)) * (width - 30);
    const y = 83 - ((index % 3) * 19) - (index === inRange.length - 1 ? 12 : 0);
    return { x: Math.max(15, Math.min(width - 15, x)), y };
  });
  const path = positions.map((point, index) => `${index ? 'L' : 'M'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(' ');
  const area = `${path} L ${positions.at(-1).x.toFixed(1)} 112 L ${positions[0].x.toFixed(1)} 112 Z`;
  const grid = [25, 56, 87].map((y) => `<line class="spark-grid" x1="0" y1="${y}" x2="640" y2="${y}"/>`).join('');
  const points = positions.map((point, index) => `<circle class="spark-point" cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="${index === positions.length - 1 ? 4 : 2.8}"/>`).join('');
  svg.innerHTML = `<defs><linearGradient id="spark-gradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#86f5ad" stop-opacity=".35"/><stop offset="1" stop-color="#86f5ad" stop-opacity="0"/></linearGradient></defs>${grid}<path class="spark-area" d="${area}"/><path class="spark-line" d="${path}"/>${points}`;
}

function filterEvents(events) {
  if (state.filter === 'hard') return events.filter(isHardReset);
  if (state.filter === 'banked') return events.filter(isBanked);
  if (state.filter === 'signals') return events.filter((event) => !isHardReset(event) && !isBanked(event));
  return events;
}

function eventTitle(event) {
  if (isHardReset(event)) return t('eventHard');
  if (isBanked(event)) return t('eventBanked');
  if (event.preview) return t('eventPreview');
  if (event.type === 'reset') return t('eventReset');
  return t('eventSignal');
}

function eventSourceLabel(event) {
  if (event.source_label === 'Verified archive') return t('sourceArchive');
  if (event.source_label === 'Live radar feed') return t('sourceLive');
  return event.source_label || t('trackedSignal');
}

function renderEvents() {
  const events = filterEvents(state.data.events).slice(0, EVENT_LIMIT);
  selectors.eventList.textContent = '';
  selectors.eventList.setAttribute('aria-busy', 'false');
  if (!events.length) {
    selectors.eventList.innerHTML = `<div class="empty-state">${t('noEvents')}</div>`;
    return;
  }
  const fragment = document.createDocumentFragment();
  events.forEach((event) => {
    const node = selectors.eventTemplate.content.cloneNode(true);
    const card = node.querySelector('.event-card');
    const tone = eventTone(event);
    card.classList.add(tone === 'hard' ? 'hard' : tone);
    const time = node.querySelector('time');
    time.dateTime = eventTime(event) || '';
    time.textContent = detailedEventTime(eventTime(event));
    node.querySelector('.event-kind').textContent = eventTitle(event);
    const confidence = node.querySelector('.event-confidence');
    confidence.textContent = `${confidenceText(event.confidence)} ${t('confidence')}`;
    node.querySelector('.event-content p').textContent = event.summary || t('eventSignal');
    const tags = node.querySelector('.event-tags');
    [describeAudience(event), ...(event.reason_tags || []).slice(0, 2).map(reasonTagText)].filter(Boolean).slice(0, 3).forEach((tag) => {
      const item = document.createElement('span');
      item.textContent = tag;
      tags.append(item);
    });
    node.querySelector('.event-source-label').textContent = eventSourceLabel(event);
    node.querySelector('.event-category-label').textContent = eventTitle(event);
    const link = node.querySelector('.event-link');
    link.href = safeUrl(event.url);
    link.querySelector('span').textContent = t('source');
    link.setAttribute('aria-label', t('openSourceFor', { title: eventTitle(event) }));
    fragment.append(node);
  });
  selectors.eventList.append(fragment);
}

function renderAll() {
  renderOverview();
  renderEvents();
}

async function fetchTimeline() {
  selectors.refresh.classList.add('is-loading');
  selectors.refresh.disabled = true;
  try {
    const response = await fetch(API_URL, { headers: { Accept: 'application/json' }, cache: 'no-store' });
    if (!response.ok) throw new Error(`Source returned ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data.events) || !data.events.length) throw new Error('Timeline response had no events');
    state.data = data;
    state.isLive = true;
    setFeedStatus(true, 'sourceConnected');
  } catch (error) {
    state.isLive = false;
    setFeedStatus(false, 'cachedRecord');
  } finally {
    selectors.refresh.classList.remove('is-loading');
    selectors.refresh.disabled = false;
    renderAll();
  }
}

document.querySelectorAll('.filter-tab').forEach((button) => {
  button.addEventListener('click', () => {
    state.filter = button.dataset.filter;
    document.querySelectorAll('.filter-tab').forEach((tab) => {
      const selected = tab === button;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
    });
    renderEvents();
  });
});

selectors.refresh.addEventListener('click', fetchTimeline);
document.querySelectorAll('.language-option').forEach((button) => {
  button.addEventListener('click', () => {
    state.language = button.dataset.language;
    try { localStorage.setItem('tibo-radar-language', state.language); } catch { /* Storage is optional. */ }
    applyTranslations();
    setFeedStatus(state.isLive, state.isLive ? 'sourceConnected' : 'connecting');
    renderAll();
  });
});
document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'r' && !/input|textarea|select/i.test(document.activeElement.tagName)) {
    event.preventDefault();
    fetchTimeline();
  }
});

applyTranslations();
setFeedStatus(false, 'connecting');
renderAll();
fetchTimeline();
setInterval(fetchTimeline, REFRESH_INTERVAL);
setInterval(() => { renderAge(); selectors.updated.textContent = state.data.updated_at ? timeAgo(state.data.updated_at) : t('offlineSample'); }, 30_000);
