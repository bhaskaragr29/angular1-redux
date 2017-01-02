import {expect} from 'chai';
import sinon from 'sinon';

import GitHubAction from '../../app/actions/github';
import * as CONSTANTS from '../../app/constants/github';


describe('Github Actions', () => {
    let sandbox, BaseApi, dependencies, dispatch;
    let $rootScope;
    let $q;

    beforeEach(angular.mock.module('AngularTestApp'));

    beforeEach(
        inject($injector => {
            BaseApi = $injector.get('BaseApi');
            $rootScope = $injector.get('$rootScope').$new();
            $q = $injector.get('$q');
            dependencies = [$q, BaseApi];
            sandbox = sinon.sandbox.create();
            dispatch = sandbox.stub();
        })
    );
    afterEach(() => sandbox.restore());

    describe('#getUsers()', () => {
        context('when get is successful', () => {
            it('should call Github to fetch all users', () => {
                const response = {
                    data: {id: 1, dummy: 'TEST'}
                };

                const expectedData = {
                    entities: {
                        brand: {
                            1: {id: 1, dummy: 'TEST'}
                        }
                    },
                    result: 1
                };

                sandbox.stub(BaseApi, 'get').returns($q.resolve(response));
                GitHubAction(...dependencies).loadUsers()(dispatch).then(() => {
                    console.log(dispatch.getCall(0).args[0]);
                })
            });
        });
    });
});