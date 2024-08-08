const request = require('supertest');
const express = require('express');

const server = 'http://localhost:8080';
const fs = require('fs');
const path = require('path');

// let testServer
// afterAll(() => testServer.close())

describe('inside', () => {
    it ('testing', () => {expect(true).toBeTruthy();})
})

describe('Route integration', () => {
  it ('shouldn\'t get any products', () => {
    return request(server)
    .get("/api/products/random")
    .expect('Content-Type', /application\/json/)
    .then((res) => {
      // console.log('products', res.body.products);
      expect(res.body.products.length).toBe(0);
    })
})
})

describe ("GET /api/products/jewelery", () => {
  it ('should get products', () => {
      return request(server)
      .get("/api/products/jewelery")
      .expect('Content-Type', /application\/json/)
      .then((res) => {
        // console.log('products', res.body.products);
        expect(res.body.products.length).not.toBe(0);
      })
  })
})
