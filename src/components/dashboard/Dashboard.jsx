import { useEffect, useState } from 'react'
import {
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock3,
  IndianRupee,
  CreditCard,
  Users,
  RefreshCw,
  ChevronDown,
  Sparkles,
  ArrowUpRight,
  Activity,
} from 'lucide-react'

import RevenueChart from '../recovery/RevenueChart'
import RecoveryPerformance from '../recovery/RecoveryPerformance'
import RecoveryOverview from '../recovery/RecoveryOverview'
import AIRecoveryInsight from './AIRecoveryInsight'
import RecentPayments from './RecentPayments'

import {
  getDashboardStats,
} from '../../services/dashboardService'


function Dashboard() {

  const [stats, setStats] = useState(null)

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState('')

  const [selectedPeriod, setSelectedPeriod] =
    useState('30')

  const [periodOpen, setPeriodOpen] =
    useState(false)

  const [refreshing, setRefreshing] =
    useState(false)

  const periods = [
    {
      value: '7',
      label: 'Last 7 days',
    },
    {
      value: '30',
      label: 'Last 30 days',
    },
    {
      value: '90',
      label: 'Last 90 days',
    },
    {
      value: '365',
      label: 'This year',
    },
  ]


  const selectedPeriodLabel =
    periods.find(
      (period) =>
        period.value === selectedPeriod
    )?.label || 'Last 30 days'

  const loadDashboard = async () => {

    try {

      setError('')

      const data =
        await getDashboardStats(
          Number(selectedPeriod)
        )

      setStats(data)

    } catch (err) {

      console.error(
        'Dashboard error:',
        err
      )

      setError(
        'Unable to load dashboard data.'
      )

    } finally {

      setLoading(false)
      setRefreshing(false)

    }
  }


  // =====================================================
  // INITIAL LOAD + PERIOD CHANGE
  // =====================================================

  useEffect(() => {

    loadDashboard()

  }, [selectedPeriod])


  const handleRefresh = async () => {

    setRefreshing(true)

    await loadDashboard()

  }

  if (loading) {

    return (
      <div className="min-h-screen bg-slate-50">

        <div className="mx-auto max-w-[1500px] px-6 py-8">

          <div className="animate-pulse">

            <div className="h-8 w-56 rounded-lg bg-slate-200" />

            <div className="mt-3 h-4 w-96 rounded bg-slate-200" />

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

              {[1, 2, 3, 4].map(
                (item) => (
                  <div
                    key={item}
                    className="h-36 rounded-2xl bg-white shadow-sm"
                  />
                )
              )}

            </div>

          </div>

        </div>

      </div>
    )
  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error) {

    return (
      <div className="min-h-screen bg-slate-50">

        <div className="mx-auto max-w-[1500px] px-6 py-10">

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">

            <div className="flex items-center gap-3">

              <AlertTriangle
                size={20}
                className="text-red-500"
              />

              <div>

                <h2 className="font-semibold text-red-800">
                  Dashboard unavailable
                </h2>

                <p className="mt-1 text-sm text-red-600">
                  {error}
                </p>

              </div>

            </div>

            <button
              type="button"
              onClick={loadDashboard}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              <RefreshCw size={15} />
              Try again
            </button>

          </div>

        </div>

      </div>
    )
  }


  // =====================================================
  // SAFE STATS
  // =====================================================

  const safeStats = stats || {}


  const totalProcessed =
    safeStats.totalProcessed ?? 0

  const failedPayments =
    safeStats.failedPayments ?? 0

  const successfulPayments =
    safeStats.successfulPayments ?? 0

  const recoveredRevenue =
    safeStats.recoveredRevenue ?? 0

  const recoveryRate =
    safeStats.recoveryRate ?? 0

  const pendingPayments =
    safeStats.pendingPayments ?? 0

  const activeCustomers =
    safeStats.activeCustomers ?? 0


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-[1500px] px-6 py-8">


        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="flex items-center gap-2">

              <Activity
                size={20}
                className="text-indigo-600"
              />

              <span className="text-sm font-semibold text-indigo-600">
                Revenue Intelligence
              </span>

            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Revenue Recovery
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Monitor payment performance and recover more revenue.
            </p>

          </div>


          {/* ================================================= */}
          {/* HEADER ACTIONS */}
          {/* ================================================= */}

          <div className="flex items-center gap-3">


            {/* PERIOD DROPDOWN */}

            <div className="relative">

              <button
                type="button"
                onClick={() =>
                  setPeriodOpen(
                    !periodOpen
                  )
                }
                className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
              >

                <Clock3
                  size={16}
                  className="text-slate-400"
                />

                <span>
                  {selectedPeriodLabel}
                </span>

                <ChevronDown
                  size={15}
                  className={`text-slate-400 transition-transform ${
                    periodOpen
                      ? 'rotate-180'
                      : ''
                  }`}
                />

              </button>


              {periodOpen && (

                <div className="absolute right-0 top-12 z-50 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">

                  {periods.map(
                    (period) => (

                      <button
                        key={period.value}
                        type="button"
                        onClick={() => {

                          setSelectedPeriod(
                            period.value
                          )

                          setPeriodOpen(false)

                        }}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition ${
                          selectedPeriod ===
                          period.value
                            ? 'bg-indigo-50 font-semibold text-indigo-700'
                            : 'text-slate-600 hover:bg-slate-50'
                        }`}
                      >

                        <span>
                          {period.label}
                        </span>

                        {selectedPeriod ===
                          period.value && (
                          <CheckCircle2
                            size={15}
                            className="text-indigo-600"
                          />
                        )}

                      </button>

                    )
                  )}

                </div>

              )}

            </div>


            {/* REFRESH */}

            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >

              <RefreshCw
                size={16}
                className={
                  refreshing
                    ? 'animate-spin'
                    : ''
                }
              />

              <span className="hidden sm:inline">
                Refresh
              </span>

            </button>

          </div>

        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">


          <MetricCard
            title="Total Payments"
            value={totalProcessed}
            description={`${selectedPeriodLabel} payment volume`}
            icon={CreditCard}
            iconStyle="bg-indigo-50 text-indigo-600"
          />


          <MetricCard
            title="Failed Payments"
            value={failedPayments}
            description="Requires recovery action"
            icon={AlertTriangle}
            iconStyle="bg-amber-50 text-amber-600"
          />


          <MetricCard
            title="Recovered Revenue"
            value={`₹${Number(
              recoveredRevenue
            ).toLocaleString('en-IN')}`}
            description="Successfully recovered"
            icon={CheckCircle2}
            iconStyle="bg-emerald-50 text-emerald-600"
          />


          <MetricCard
            title="Recovery Rate"
            value={`${recoveryRate}%`}
            description="Successful vs failed payments"
            icon={TrendingUp}
            iconStyle="bg-blue-50 text-blue-600"
          />

        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(340px,0.75fr)]">


          {/* REVENUE CHART */}

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

              <div>

                <h2 className="text-base font-bold text-slate-900">
                  Revenue Performance
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Revenue movement over{' '}
                  {selectedPeriodLabel.toLowerCase()}
                </p>

              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-400">

                <span className="h-2 w-2 rounded-full bg-indigo-500" />

                Revenue

              </div>

            </div>

            <div className="p-6">

            <RevenueChart
  period={Number(selectedPeriod)}
/>

            </div>

          </section>


          {/* RECOVERY OVERVIEW */}

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-start justify-between">

              <div>

                <h2 className="text-base font-bold text-slate-900">
                  Recovery Overview
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Current recovery activity
                </p>

              </div>

              <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">

                <CreditCard size={17} />

              </div>

            </div>

            <div className="mt-6">

              <RecoveryOverview />

            </div>

          </section>

        </div>


        <section className="mt-6 overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm">

          <div className="border-b border-indigo-50 bg-indigo-50/40 px-6 py-5">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-indigo-600 p-2.5 text-white shadow-sm">

                <Sparkles size={18} />

              </div>

              <div>

                <h2 className="font-bold text-slate-900">
                  AI Recovery Opportunity
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  AI-powered recommendations for improving recovery.
                </p>

              </div>

            </div>

          </div>

          <div className="p-6">

            <AIRecoveryInsight />

          </div>

        </section>


        <div className="mt-6 grid gap-6 lg:grid-cols-2">


          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-base font-bold text-slate-900">
                  Recovery Performance
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Recovery success and failure trends
                </p>

              </div>

              <TrendingUp
                size={18}
                className="text-emerald-500"
              />

            </div>

            <div className="mt-6">

              <RecoveryPerformance />

            </div>

          </section>


          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-base font-bold text-slate-900">
                  AI Insights
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Patterns detected across payment failures
                </p>

              </div>

              <Sparkles
                size={18}
                className="text-indigo-500"
              />

            </div>

            <div className="mt-6">

              <AIRecoveryInsight />

            </div>

          </section>

        </div>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">

            <div>

              <h2 className="text-base font-bold text-slate-900">
                Recent Payments
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Latest payment activity
              </p>

            </div>

            <ArrowUpRight
              size={17}
              className="text-slate-400"
            />

          </div>

          <div className="p-6">

            <RecentPayments />

          </div>

        </section>
        <div className="mt-6 grid gap-4 md:grid-cols-3">


          <SummaryCard
            icon={Users}
            title="Active Customers"
            value={activeCustomers}
            description="Customers with recent activity"
          />


          <SummaryCard
            icon={Clock3}
            title="Pending Recovery"
            value={pendingPayments}
            description="Payments awaiting recovery"
          />


          <SummaryCard
            icon={CheckCircle2}
            title="Successful Payments"
            value={successfulPayments}
            description="Successfully completed payments"
          />

        </div>


      </div>

    </div>
  )
}


function MetricCard({
  title,
  value,
  description,
  icon: Icon,
  iconStyle,
}) {

  return (

    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>

        </div>

        <div
          className={`rounded-xl p-2.5 ${iconStyle}`}
        >

          <Icon size={18} />

        </div>

      </div>

      <p className="mt-4 text-xs text-slate-400">
        {description}
      </p>

    </div>
  )
}


function SummaryCard({
  icon: Icon,
  title,
  value,
  description,
}) {

  return (

    <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

      <div className="rounded-xl bg-slate-50 p-3 text-slate-600">

        <Icon size={19} />

      </div>

      <div className="min-w-0">

        <p className="text-xs font-medium text-slate-400">
          {title}
        </p>

        <p className="mt-1 text-xl font-bold text-slate-900">
          {value}
        </p>

        <p className="mt-1 truncate text-xs text-slate-400">
          {description}
        </p>

      </div>

    </div>
  )
}


export default Dashboard