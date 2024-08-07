import { describe, test, expect } from 'vitest'
import { render, renderHook, screen } from '@testing-library/react'
import App from '../frontend/src/App.jsx';

describe('<App />', () => {
  test('starts'), () => {
    expect(true).toBeTruthy();
  }

  test('App mounts properly', () => {
    const wrapper = render(<App />)
    expect(wrapper).toBeTruthy()
  })
});