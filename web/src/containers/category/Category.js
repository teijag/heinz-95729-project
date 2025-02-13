import React, { Component } from 'react';
import GradientHeader from '../../components/header/GradientHeader';
import Navbar from '../../components/nav/Navbar';
import ProductCard from '../../components/card/ProductCard';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import './Category.css';


class Category extends Component {
    
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            category: props.match.params.category,
            products: []
        }
    }

    fetchProducts = () => {
        const SERVER_URL = "http://127.0.0.1:8080/product/category?category=" + this.state.category;

        axios.get(SERVER_URL)
            .then((response) => {
                this.setState({
                    products: response.data
                });
            })
            .catch(function (response) {
                // Handle error
                console.log(response);
            });
    }

    componentDidMount() {
        this.fetchProducts();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location.key !== this.state.category) {
            window.location.reload();
        }
    }

    render() {
        let gridData = [];
        let arr = this.state.products;
        let count = 0;
        while(arr.length && count < 20) {
            gridData.push(arr.splice(0, 4));
            count++;
        }

        let gridCols = gridData.map((value, index) => {
            return (
                <Row key={index} className="results-row">
                {
                    value.map(item => {
                        return (
                            <Col md={3} key={item['productId']}>
                                <ProductCard title={item['name']} productId={item['productId']} />
                            </Col>
                        );
                    })
                }
                </Row>
            );
        });

        return (
            <div className="Product">
                {/* Header and Navbar at the top of the page */}
                <GradientHeader />
                <div className="navbar-container">
                    <Navbar isLoggedIn={this.props.isLoggedIn} />
                </div>

                <Container>
                    <h4 className="search-results-title">Welcome to "{this.state.category}" category</h4>
                    {gridCols}
                </Container>
            </div>
        );
    }
}

export default Category;
