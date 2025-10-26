import { render, screen } from '@testing-library/react';
import MetricCard from '@/components/MetricCard';
import { TrendingUp } from 'lucide-react';

describe('MetricCard', () => {
  it('renders metric card with correct values', () => {
    render(
      <MetricCard
        title="Test Metric"
        value="95"
        unit="%"
        description="Test description"
        icon={<TrendingUp />}
        trend="up"
      />
    );

    expect(screen.getByText('Test Metric')).toBeInTheDocument();
    expect(screen.getByText('95')).toBeInTheDocument();
    expect(screen.getByText('%')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.getByText('↗ Trending up')).toBeInTheDocument();
  });

  it('renders without optional props', () => {
    render(
      <MetricCard
        title="Simple Metric"
        value={42}
      />
    );

    expect(screen.getByText('Simple Metric')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('applies correct trend colors', () => {
    const { rerender } = render(
      <MetricCard
        title="Up Trend"
        value="100"
        trend="up"
      />
    );

    expect(screen.getByText('100')).toHaveClass('text-neon-green');

    rerender(
      <MetricCard
        title="Down Trend"
        value="50"
        trend="down"
      />
    );

    expect(screen.getByText('50')).toHaveClass('text-red-400');

    rerender(
      <MetricCard
        title="Stable Trend"
        value="75"
        trend="stable"
      />
    );

    expect(screen.getByText('75')).toHaveClass('text-neon-blue');
  });
});
