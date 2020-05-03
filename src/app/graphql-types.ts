import gql from 'graphql-tag';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};



/** Represents the api version */
export type ApiVersion = {
   __typename?: 'ApiVersion';
  /** Represents the app name */
  app_name?: Maybe<Scalars['String']>;
  /** Represents the app version */
  app_version?: Maybe<Scalars['String']>;
};

/**
 * Represents the api version
 * You must be authorized to use this function
 */
export type CurrentUser = {
   __typename?: 'CurrentUser';
  /** Represents the app name */
  email_address?: Maybe<Scalars['String']>;
};

/** Represents a DrinkSpot */
export type DrinkSpot = {
   __typename?: 'DrinkSpot';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  quality?: Maybe<Scalars['String']>;
  up_votes?: Maybe<Scalars['Int']>;
  down_votes?: Maybe<Scalars['Int']>;
};

export enum DrinkSpotWaterQuality {
  Drinkable = 'DRINKABLE',
  NotDrinkable = 'NOT_DRINKABLE',
  Unknown = 'UNKNOWN'
}

export type Mutation = {
   __typename?: 'Mutation';
  createDrinkSpot?: Maybe<DrinkSpot>;
};


export type MutationCreateDrinkSpotArgs = {
  name: Scalars['String'];
  description: Scalars['String'];
  Latitude: Scalars['Float'];
  Longitude: Scalars['Float'];
  Quality: DrinkSpotWaterQuality;
};

export type Query = {
   __typename?: 'Query';
  /** Returns the current api version */
  getCurrentUser?: Maybe<CurrentUser>;
  /** Returns the current api version */
  getApiVersion?: Maybe<ApiVersion>;
  /** Searches for nearby drinking spots */
  searchDrinkingSpots: Array<DrinkSpot>;
};


export type QuerySearchDrinkingSpotsArgs = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  radius?: Maybe<Scalars['Int']>;
};

export type HomePageDataQueryVariables = {};


export type HomePageDataQuery = (
  { __typename?: 'Query' }
  & { drink_spots: Array<(
    { __typename?: 'DrinkSpot' }
    & Pick<DrinkSpot, 'id' | 'name' | 'description' | 'down_votes' | 'up_votes' | 'latitude' | 'longitude'>
  )> }
);

export type ProfilePageDataQueryVariables = {};


export type ProfilePageDataQuery = (
  { __typename?: 'Query' }
  & { current_user?: Maybe<(
    { __typename?: 'CurrentUser' }
    & Pick<CurrentUser, 'email_address'>
  )> }
);

export type CreateDrinkSpotMutationVariables = {
  name: Scalars['String'];
  description: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  quality: DrinkSpotWaterQuality;
};


export type CreateDrinkSpotMutation = (
  { __typename?: 'Mutation' }
  & { createDrinkSpot?: Maybe<(
    { __typename?: 'DrinkSpot' }
    & Pick<DrinkSpot, 'id' | 'name' | 'description' | 'latitude' | 'longitude' | 'quality' | 'up_votes' | 'down_votes'>
  )> }
);

export const HomePageDataDocument = gql`
    query HomePageData {
  drink_spots: searchDrinkingSpots(latitude: 0, longitude: 0, radius: 0) {
    id
    name
    description
    down_votes
    up_votes
    latitude
    longitude
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class HomePageDataGQL extends Apollo.Query<HomePageDataQuery, HomePageDataQueryVariables> {
    document = HomePageDataDocument;
    
  }
export const ProfilePageDataDocument = gql`
    query ProfilePageData {
  current_user: getCurrentUser {
    email_address
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ProfilePageDataGQL extends Apollo.Query<ProfilePageDataQuery, ProfilePageDataQueryVariables> {
    document = ProfilePageDataDocument;
    
  }
export const CreateDrinkSpotDocument = gql`
    mutation createDrinkSpot($name: String!, $description: String!, $latitude: Float!, $longitude: Float!, $quality: DrinkSpotWaterQuality!) {
  createDrinkSpot(name: $name, description: $description, Latitude: $latitude, Longitude: $longitude, Quality: $quality) {
    id
    name
    description
    latitude
    longitude
    quality
    up_votes
    down_votes
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateDrinkSpotGQL extends Apollo.Mutation<CreateDrinkSpotMutation, CreateDrinkSpotMutationVariables> {
    document = CreateDrinkSpotDocument;
    
  }